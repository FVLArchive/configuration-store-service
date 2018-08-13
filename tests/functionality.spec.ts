import { ConfigurationStoreService } from "../index"
import { expect } from "chai"
import "mocha"
import { doesNotThrow } from "assert"

// TODO: mock the network calls
describe("Confguration store service", () => {
  var store: ConfigurationStoreService
  before(() => {
    /*
    console.log(
      "Using configs",
      process.env.CONFIG_STORE_SERVICE_URI,
      process.env.CONFIG_STORE_SERVICE_APIKEY
    )
    */
    store = new ConfigurationStoreService(
      process.env.CONFIG_STORE_SERVICE_URI,
      process.env.CONFIG_STORE_SERVICE_APIKEY,
      "testMochaUser"
    )
    return store.init()
  })

  it("should return default global value when no value exists", () => {
    const defaultValue = "test default value"
    return store.getGlobalData("testString", defaultValue).then(val => {
      expect(val).to.equal(defaultValue)
    })
  })
  it("should return numeric value", () => {
    const defaultValue = 6
    return store.getGlobalData("testNumber", defaultValue).then(val => {
      expect(val).to.equal(defaultValue)
    })
  })
  it("should return object value", () => {
    const defaultValue = { a: "apple", b: "butter" }
    return store.getGlobalData("testObject", defaultValue).then(val => {
      expect(val).to.be.not.null
      expect(val.a).to.equal(defaultValue.a)
      expect(val.b).to.equal(defaultValue.b)
    })
  })
})
