import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkGenerationService {

  constructor() { }


  public webLinkGeneration(protocol, domainUrl, prefix, api) {
    return protocol + '://' + domainUrl + prefix + api;
  }
}
