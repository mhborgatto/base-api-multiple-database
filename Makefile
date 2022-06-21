.PHONY: build publish deploy gitForce

AWS_DEFAULT_REGION=sa-east-1

TASK_NAME=base-api-task-name
SERVICE_NAME=base-api-service-name
CLUSTER_NAME=base-api-cluster-name

define docker_tag_and_publish
	$(eval package_version := $(strip ${1}))
	docker tag base-api:latest accountId.dkr.ecr.sa-east-1.amazonaws.com/base-api:$(package_version)
	docker push accountId.dkr.ecr.sa-east-1.amazonaws.com/base-api:$(package_version)
endef

build:
	docker build --rm -t base-api .

publish: build
	$$(aws ecr get-login --region ${AWS_DEFAULT_REGION} --no-include-email)
	$(eval package_version := $(shell npx -c 'echo "$$npm_package_version"'))
	$(call docker_tag_and_publish, $(package_version))
	$(call docker_tag_and_publish, latest)

deploy:
	$(eval package_version := $(shell npx -c 'echo "$$npm_package_version"'))
	$(shell aws ecs describe-task-definition --task-definition ${TASK_NAME} --region ${AWS_DEFAULT_REGION} | sed -E 's/"image": "(.*):(.*)"/"image": "\1:'${package_version}'"/' | jq -Merc ".taskDefinition.containerDefinitions" > /tmp/updated_task_definition.json)
	$(eval task_revision := $(shell aws ecs register-task-definition --requires-compatibilities FARGATE --execution-role-arn arn:aws:iam::accountId:role/ecsTaskExecutionRole --cpu 256 --memory 512 --network-mode awsvpc --family ${TASK_NAME} --region ${AWS_DEFAULT_REGION} --container-definitions file:///tmp/updated_task_definition.json | jq -Merc ".taskDefinition.taskDefinitionArn" | sed 's/.*:\(.*\)/\1/'))
	aws ecs update-service --force-new-deployment --region ${AWS_DEFAULT_REGION} --service ${SERVICE_NAME} --cluster ${CLUSTER_NAME} --task-definition ${TASK_NAME}:${task_revision}
	$(eval base-api-arn := $(shell aws ecs list-tasks --region ${AWS_DEFAULT_REGION} --cluster ${CLUSTER_NAME} --service ${SERVICE_NAME} --query "taskArns[0]" --output text))
	aws ecs stop-task --cluster ${CLUSTER_NAME} --region ${AWS_DEFAULT_REGION} --task ${base-api-arn}

gitForce:
	git add .
	git commit --amend --no-edit
	git push -f