'use strict'

export class SamplesException {
  constructor(message) {
    this.message = message
  }
}

export class SamplesNotFoundException {
  constructor(message) {
    this.message = message
  }
}

export class SamplesUnAuthorizedException {
  constructor(message) {
    this.message = message
  }
}

export class SampleCreateRequest{
  constructor(description){
    this.description = description
  }
}