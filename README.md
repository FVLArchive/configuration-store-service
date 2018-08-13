# configuration-store-service

An SDK for access a particular type of configuration-store api/service that has been implemented in GraphQL.

# Usage

## Create and initialize the object.

```ts
const currentUserId = '1234';
const settings = new ConfigurationStoreService('url of remote configuration store graphql service', currentUserId);
return settings.init().then(() => {...});
```

## Retrieve values by key or get it's default value if a value doesn't exist for the key.

```ts
return settings.getGlobalData('someKey', 'default value')
.then(globalValue => ...);
```

```ts
return settings.getUserData('someOtherKey', 'default value')
.then(userValue => ...);
```

## Set the key-value pair.

```ts
return settings.setGlobalData('someKey', 'some value')
.then(globalValue => ...);
```

```ts
return settings.setUserData('someOtherKey', 'some value')
.then(userValue => ...);
```
