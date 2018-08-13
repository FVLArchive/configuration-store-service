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

  /////////////// Global
  it("should retrieve global string value", () => {
    const defaultValue = "test default value"
    return store.getGlobalData("testString", defaultValue).then(val => {
      expect(val).to.equal(defaultValue)
    })
  })
  it("should store global string value", () => {
    const value = "test default value 2"
    return store.setGlobalData("testString2", value).then(val => {
      expect(val).to.equal(value)
    })
  })

  it("should retrieve global numeric value", () => {
    const defaultValue = 6
    return store.getGlobalData("testNumber", defaultValue).then(val => {
      expect(val).to.equal(defaultValue)
    })
  })
  it("should store global numeric value", () => {
    const defaultValue = 8
    return store.setGlobalData("testNumber2", defaultValue).then(val => {
      expect(val).to.equal(defaultValue)
    })
  })

  it("should retrieve global object value", () => {
    const defaultValue = { a: "apple", b: "butter" }
    return store.getGlobalData("testObject", defaultValue).then(val => {
      expect(val).to.be.not.null
      expect(val.a).to.equal(defaultValue.a)
      expect(val.b).to.equal(defaultValue.b)
    })
  })
  it("should store global object value", () => {
    const defaultValue = { c: "cider", d: "donut" }
    return store.getGlobalData("testObject2", defaultValue).then(val => {
      expect(val).to.be.not.null
      expect(val.c).to.equal(defaultValue.c)
      expect(val.d).to.equal(defaultValue.d)
    })
  })

  /////////////// User
  it("should retrieve user string value", () => {
    const defaultValue = "test default value"
    return store.getUserData("testString", defaultValue).then(val => {
      expect(val).to.equal(defaultValue)
    })
  })
  it("should store user string value", () => {
    const value = "test default value 2"
    return store.setUserData("testString2", value).then(val => {
      expect(val).to.equal(value)
    })
  })

  it("should retrieve user numeric value", () => {
    const defaultValue = 7
    return store.getUserData("testNumber", defaultValue).then(val => {
      expect(val).to.equal(defaultValue)
    })
  })
  it("should store user numeric value", () => {
    const defaultValue = 8
    return store.setUserData("testNumber2", defaultValue).then(val => {
      expect(val).to.equal(defaultValue)
    })
  })

  it("should retrieve user object value", () => {
    const defaultValue = { a: "apple", b: "butter" }
    return store.getUserData("testObject", defaultValue).then(val => {
      expect(val).to.be.not.null
      expect(val.a).to.equal(defaultValue.a)
      expect(val.b).to.equal(defaultValue.b)
    })
  })
  it("should store user object value", () => {
    const defaultValue = { c: "cider", d: "donut" }
    return store.getUserData("testObject2", defaultValue).then(val => {
      expect(val).to.be.not.null
      expect(val.c).to.equal(defaultValue.c)
      expect(val.d).to.equal(defaultValue.d)
    })
  })
})
