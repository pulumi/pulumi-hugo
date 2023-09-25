---
title_tag: "deletedWith | Resource Options"
meta_desc: Point the deletedWith option to the container resource that will automatically delete this resource when the container resource is deleted.
title: "deletedWith"
h1: "Resource option: deletedWith"
meta_image: /images/docs/meta-images/docs-meta.png
menu:
  concepts:
    identifier: deletedWith
    parent: options
    weight: 5
---

A resource may be deleted automatically when another resource is deleted. The other resource can be seen as a container resource. When such a container resource is deleted, 

{{% notes "info" %}}
This resource option was introduced in [Pulumi v3.46.1](https://github.com/pulumi/pulumi/releases/tag/v3.46.1). For this option to function correctly, you need this minimum version for *both* the Pulumi CLI and the core Pulumi SDK.
{{% /notes %}}

Setting the `deletedWith` option to the container resource means that Pulumi will not delete the existing resource but rely on an automatic deletion of this resource as part of deleting the container resource. Pulumi will remove this resource from the state.

In this example, Pulumi will not delete the `Grant` resource, but will rely on MySQL to cleanup the grants when user `jdoeUser` is deleted:

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" >}}

{{% choosable language javascript %}}

```javascript
const jdoeUser = new mysql.User("jdoeUser", {
    user: "johndoe",
    plaintextPassword: password,
});

const jdoeGrant = new mysql.Grant("jdoeGrant", {
    database: tempDb.name,
    user: jdoeUser.user,
    privileges: [
        "SELECT",
        "UPDATE",
    ],
},
{
    deletedWith: jdoeUser
});
```

{{% /choosable %}}

{{% choosable language typescript %}}

```typescript
const jdoeUser = new mysql.User("jdoeUser", {
    user: "johndoe",
    plaintextPassword: password,
});

const jdoeGrant = new mysql.Grant("jdoeGrant", {
    database: tempDb.name,
    user: jdoeUser.user,
    privileges: [
        "SELECT",
        "UPDATE",
    ],
},
{
    deletedWith: jdoeUser
});
```

{{% /choosable %}}

{{% choosable language python %}}

```python
jdoe_user = mysql.User("jdoeUser",
    user="johndoe",
    plaintext_password=password)

jdoe_grant = mysql.Grant("jdoeGrant",
    database=temp_db.name,
    user=jdoe_user.user,
    privileges=[
        "SELECT",
        "UPDATE",
    ],
    opts=pulumi.ResourceOptions(
        deleted_with=jdoe_user
    ))
```

{{% /choosable %}}

{{% choosable language go %}}

```go
jdoeUser, err := mysql.NewUser(ctx, "jdoeUser", &mysql.UserArgs{
    User:              pulumi.String("johndoe"),
    PlaintextPassword: pulumi.String(password),
})
if err != nil {
    return err
}

_, err = mysql.NewGrant(ctx, "jdoeGrant", &mysql.GrantArgs{
    Database: tempDb.Name,
    User:     jdoeUser.User,
    Privileges: pulumi.StringArray{
        pulumi.String("SELECT"),
        pulumi.String("UPDATE"),
    },
}, pulumi.DeletedWith(jdoeUser))
if err != nil {
    return err
}
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
var jdoeUser = new MySql.User("jdoeUser", new()
{
    UserName = "johndoe",
    PlaintextPassword = password,
});

var jdoeGrant = new MySql.Grant("jdoeGrant", new()
{
    Database = tempDb.Name,
    User = jdoeUser.UserName,
    Privileges = new[]
    {
        "SELECT",
        "UPDATE",
    },
},
new() {
    DeletedWith = jdoeUser
});
```

{{% /choosable %}}

{{% choosable language java %}}

{{% notes "info" %}}
This resource option is not yet implemented for Java. You can follow up the [implementation status on Github](https://github.com/pulumi/pulumi-java/issues/944).
{{% /notes %}}

```java
var jdoeUser = new User("jdoeUser", UserArgs.builder()        
    .user("johndoe")
    .plaintextPassword(password)
    .build());

var jdoeGrant = new Grant("jdoeGrant", GrantArgs.builder()        
    .database(tempDb.name())
    .user(jdoeUser.user())
    .privileges(            
        "SELECT",
        "UPDATE")
    .build(),
    CustomResourceOptions.builder()
        .deletedWith(jdoeUser)
        .build());
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
resources:
  ...
  jdoeUser:
    type: mysql:User
    properties:
      user: "johndoe"
      plaintextPassword: ${password}
  jdoeGrant:
    type: mysql:Grant
    properties:
      database: ${tempDb.name}
      user: ${jdoeUser.user}
      privileges:
        - "SELECT"
        - "UPDATE"
    options:
      deletedWith: ${jdoeUser}
```

{{% /choosable %}}

{{< /chooser >}}
