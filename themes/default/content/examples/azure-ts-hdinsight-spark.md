---
title: "Spark on Azure HDInsight"
meta_desc: ""
metadata:
  id: azure-ts-hdinsight-spark
  title: "Spark on Azure HDInsight"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-ts-hdinsight-spark
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example creates an HDInsight Spark cluster with an associated storage account in Azure using TypeScript. It utilizes Azure&#x27;s VM, Storage, Network and HDInsight services to configure a cloud-based Big Data processing platform. The code allows users to define cluster sizes, specify storage options, configure the virtual network and more. This Pulumi example thus serves a Big Data processing use case on the Azure cloud platform."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/classic-azure-ts-hdinsight-spark/README.md)

# Spark on Azure HDInsight

An example Pulumi component that deploys a Spark cluster on Azure HDInsight.

## Running the App

1.  Create a new stack:

    ```
    $ pulumi stack init dev
    ```

1.  Login to Azure CLI (you will be prompted to do this during deployment if you forget this step):

    ```
    $ az login
    ```

1.  Restore NPM dependencies:

    ```
    $ npm install
    ```

1.  Run `pulumi up` to preview and deploy changes:

    ``` 
    $ pulumi up
    Previewing changes:
    ...

    Performing changes:
    ...
    info: 5 changes performed:
        + 5 resources created
    Update duration: 15m6s
    ```

1.  Check the deployed Spark endpoint:

    ```
    $ pulumi stack output endpoint
    https://myspark1234abcd.azurehdinsight.net/
    
    # For instance, Jupyter notebooks are available at https://myspark1234abcd.azurehdinsight.net/jupyter/
    # Follow https://docs.microsoft.com/en-us/azure/hdinsight/spark/apache-spark-load-data-run-query to test it out
    ```

