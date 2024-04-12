package myproject;

import com.pulumi.Pulumi;
import com.pulumi.aws.iam.User;
import com.pulumi.aws.iam.UserArgs;
import com.pulumi.aws.iam.Group;
import com.pulumi.aws.iam.GroupArgs;
import com.pulumi.aws.iam.GroupPolicy;
import com.pulumi.aws.iam.GroupPolicyArgs;
import com.pulumi.aws.iam.GroupMembership;
import com.pulumi.aws.iam.GroupMembershipArgs;
import static com.pulumi.codegen.internal.Serialization.*;
import java.util.List;
import java.util.Map;

public class App {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {
            // Create our users.
            var jane = new User("jane", UserArgs.builder().build());
            var mary = new User("mary", UserArgs.builder().build());

            // Define a group and assign a policy for it.
            var devs = new Group("devs", GroupArgs.builder()
                .path("/users/")
                .build());
            
            var myDeveloperPolicy = new GroupPolicy("my_developer_policy", GroupPolicyArgs.builder()
                .group(devs.name())
                .policy(serializeJson(
                    jsonObject(
                        jsonProperty("Version", "2012-10-17"),
                        jsonProperty("Statement", jsonArray(jsonObject(
                            jsonProperty("Action", jsonArray("ec2:Describe*")),
                            jsonProperty("Effect", "Allow"),
                            jsonProperty("Resource", "*")
                        )))
                    )))
                .build());

            // Finally add the users as members to this group.
            var devTeam = new GroupMembership("dev-team", GroupMembershipArgs.builder()
                .group(devs.name())
                .users(            
                    List.of(jane.name(),
                    mary.name())
                )
                .build());
        });
    }
}
