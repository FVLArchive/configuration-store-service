import * as admin from "firebase-admin"
import { BaseConfigurationStore, IConfigurationStore } from "@fvlab/configurationstore"
import ApolloClient, { gql } from "apollo-boost"
import fetch from "cross-fetch"

export class ConfigurationStoreService implements IConfigurationStore {
  private client: ApolloClient<{}>

  constructor(private apiServerUri: string, private apiKey: string, private userID: string) {}

  init(): Promise<IConfigurationStore> {
    this.client = new ApolloClient({
      uri: this.apiServerUri,
      fetch,
      headers: { userid: this.userID, apikey: this.apiKey }
    })
    return Promise.resolve(this)
  }

  /**
   * Convert the stored value back into the desired type requested by the client
   */
  convertData<T>(data: any, type: string): T {
    if (type === "string") return data
    return JSON.parse(String(data))
  }

  /**
   * Prepare the value for storage
   */
  prepareData<T>(data: T): string {
    if (!data || typeof data === "string") return String(data)
    return JSON.stringify(data)
  }

  setData<T>(method: string, key: string, value: T): Promise<T> {
    return this.client
      .mutate({
        variables: { key: key, value: this.prepareData(value) },
        mutation: gql`
          mutation ${method}($key: String!, $value: String!) {
            setGlobalData(Key: $key, Value: $value)
          }
        `
      })
      .then(data => value)
  }

  getData<T>(method: string, key: string, defaultValue?: T): Promise<T> {
    return this.client
      .query({
        variables: { key: key, defaultValue: this.prepareData(defaultValue) },
        query: gql`
          query get($key: String!, $defaultValue: String) {
            ${method}(Key: $key, DefaultValue: $defaultValue)
          }
        `
      })
      .then(data => this.convertData<T>(data.data["globalData"], typeof defaultValue))
  }

  setGlobalData<T>(key: string, value: T): Promise<T> {
    return this.setData("setGlobalData", key, value)
  }

  getGlobalData<T>(key: string, defaultValue?: T): Promise<T> {
    return this.getData("globalData", key, defaultValue)
  }

  setUserData<T>(key: string, value: T): Promise<T> {
    return this.setData("setUserData", key, value)
  }

  getUserData<T>(key: string, defaultValue?: T): Promise<T> {
    return this.getData("userData", key, defaultValue)
  }
}
