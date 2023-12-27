---
title_tag: "Unit Testing Stack References in Golang"
meta_desc: "A tutorial to unit testing Pulumi Stack References using mock-based tests in Go"
title: Unit testing Stack References
h1: Unit testing pulumi stack references
weight: 2
menu:
  usingpulumi:
    parent: testing
aliases:
- /docs/guides/testing/unit-sr/
---

## Overview

Pulumi programs are authored in general-purpose languages like TypeScript, Python, Go, C#, or Java. The full power of each language is available, including access to tools, libraries, and testing frameworks.

When running an update, your Pulumi program talks to the Pulumi CLI to orchestrate any deployment changes. Unit tests aim to cut this communication channel and replace the engine with mocks. Mocks respond to the commands from _within_ the same process and return mock (or dummy) data for each call that your Pulumi program makes.

Because mocks don't execute any actual work, unit tests run very fast. Also, they can be deterministic because tests don't depend on the behavior of any external system.

In Pulumi, stack references are a way to reference and use the outputs of one stack in another. Stack references are a common way to decouple infrastructure, handle cross-environment deployments, and manage dependencies. DevOps engineers may need to mock a `StackReference` as part of a CI/CD pipeline and to meet code coverage standards.

[**Learn more about Stack References**](/docs/using-pulumi/testing/unit).

## Get started

In this tutorial, you will follow step-by-step instructions to add mock unit tests for a `StackReference` in Go. In particular, you will create a mock using an interface and write three tests using [Gingko](https://onsi.github.io/ginkgo/), a popular testing framework. The tests will check the name and output of a stack reference mock are as expected. The tutorial takes a [Test Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development) approach.

## Pre-requisites

Before you begin, ensure you have the following:

- Download and install [go](https://go.dev/doc/install)
- Download and install the [Pulumi CLI](https://www.pulumi.com/docs/install/)

## Steps

{{% notes type="info" %}}
You can find the complete solution of this tutorial under the [tutorials repository](https://github.com/pulumi/tutorials/tree/testing-unit-go-stackreferences-end).

[![Deploy with Pulumi](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/tutorials/tree/testing-unit-go-stackreferences-end)

{{% /notes %}}

### 1. Initialize the Pulumi program

#### a. Use a new, empty directory

```bash
$ cd $GOPATH/src
$ mkdir testing-unit-go-stackreferences
$ cd testing-unit-go-stackreferences
```

#### b. Create the program

```bash
$ pulumi new https://github.com/pulumi/tutorials/tree/testing-unit-go-stackreferences-begin
```

### 2. Add the testing framework

You can write unit tests and assertions using your favorite frameworks and libraries. We use Ginkgo and Gomega.

```bash
# install deps
$ go install github.com/onsi/ginkgo/v2/ginkgo
$ go mod tidy

# create test suite and test skeletons
$ ginkgo bootstrap  
$ cd devstack
$ ginkgo generate devstack
```

Verify your directory structure matches the following:

```bash
├── LICENSE
├── README.md
├── devstack
│   ├── devstack.go
│   ├── devstack_suite_test.go
│   ├── devstack_test.go
│   ├── mock.go    ### you'll add this in step 3c below
│   └── real.go    ### you'll add this in step 5 below
├── go.mod
├── go.sum
└── main.go
```

### 3. Test the `StackReference.Name()`

To get another stack's output(s), we must refer to the existing stack by passing its fully qualified name. Hence, the first test is to pass a valid `string` name and confirm the return has the expected `pulumi.StringOutput`.

#### a. Write the test

In TTD, you'll write the test first, then enough code to make the test pass.

Replace the contents of `devstack_test.go` with:

```go
package devstack_test

import (
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

var _ = Describe("Dev", func() {
	Context("When I have an existing stack reference\n", func() {
		It("Should have a fully qualified name", func() {
			name := "PLACEHOLDER"
			expected := pulumi.String("myOrg/myProject/myStack").ToStringOutput()
			Expect(name).To(Equal(expected))
		})
	})
})
```

#### b. Run the test

The test is expected to fail at this point as the goal is to verify the test runs.

```bash
$ go test ./...
FAIL! -- 0 Passed | 1 Failed | 0 Pending | 0 Skipped
```

#### c. Create the mock

Stack references have a function `Name()` that returns a `pulumi.StringOutput`.

Create a new file `mock.go` under the `devstack` package:

```go
package devstack

import "github.com/pulumi/pulumi/sdk/v3/go/pulumi"

type MockStackReference struct {
}

func (m *MockStackReference) Name() pulumi.StringOutput {
	return pulumi.String("myOrg/myProject/myStack").ToStringOutput()
}
```

In `devstack.go`, create an interface that wraps the methods of `pulumi.StackReference`:

```go
type StackReference interface {
	Name() pulumi.StringOutput
}
```

#### d. Update the test

With the mock in place, reference it in the test.

Replace the contents of `devstack_test.go` with:

```go
package devstack_test

import (
	. "<YOUR_GO_PATH>/testing-unit-go-stackreferences/devstack" // update this path!

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

var _ = Describe("Dev", func() {
	Context("When I have a StackReference\n", func() {
		mock := &MockStackReference{}
		It("Should have a valid name", func() {
			name := mock.Name()
			expected := pulumi.String("myOrg/myProject/myStack").ToStringOutput()
			Expect(name).To(Equal(expected))
		})
	})
})
```

#### d. Re-run the test

The test is expected to pass as we have the mock in place.

From the project root directory, run:

```bash
$ go test ./...
SUCCESS! -- 1 Passed | 0 Failed | 0 Pending | 0 Skipped
```

#### e. Refactor as needed

With the tests passing, you'll refactor the code for readability. We can confidently use the _real_ stack reference name.

In `devstack.go`, add:

```go
const STACK_REF_NAME = "myOrg/myProject/myStack"
```

Update the test to use the newly defined variable so the expected result reads:

```go
expected := pulumi.String(STACK_REF_NAME).ToStringOutput()
```

Lastly, update the mocked `Name()` function so that it returns the following:

```go
return pulumi.String(STACK_REF_NAME).ToStringOutput()
```

### 4. Test the StackReference.GetOutput()

You're now ready to test the primary use case of stack references to obtain an output value.

#### a. Write the test

Replace the contents of `devstack_test.go` with:

```go
package devstack_test

import (
	. "<YOUR_GO_PATH>/testing-unit-go-stackreferences/devstack" // update this path!

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

var _ = Describe("Dev", func() {
	Context("When I have a StackReference\n", func() {
		mock := &MockStackReference{}
		It("Should have a valid name", func() {
			name := mock.Name()
			expected := pulumi.String(STACK_REF_NAME).ToStringOutput()
			Expect(name).To(Equal(expected))
		})

		It("Should have a valid output", func() {
			output := "PLACEHOLDER"
			expected := pulumi.Any("bar")
			Expect(output).To(Equal(expected))
		})
	})
})
```

#### b. Run the tests

We expect the first test to pass and the new one to fail, as the mock has not been updated. Re-running the tests ensures we haven't inadvertently affected existing tests.

```bash
$ go test ./...
FAIL! -- 1 Passed | 1 Failed | 0 Pending | 0 Skipped
```

#### c. Update the mock

Stack references have a function `GetOutput()` that return a `pulumi.AnyOutput` value. For your mock to do the same, append the following to the `mock.go` file:

```go
func (m *MockStackReference) GetOutput(name pulumi.StringInput) pulumi.AnyOutput {
	// Mock implementation
	if name == pulumi.String("foo") {
		return pulumi.Any("bar")
	} else {
		return pulumi.Any(nil)
	}
}
```

#### d. Update the test

With the newly mocked function in place, reference it in the test.

Replace the contents of `devstack_test.go` with:

```go
package devstack_test

import (
	. "<YOUR_GO_PATH>/testing-unit-go-stackreferences/devstack" // update this path!

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

var _ = Describe("Dev", func() {
	Context("When I have a StackReference\n", func() {
		mock := &MockStackReference{}
		It("Should have a valid name", func() {
			name := mock.Name()
			expected := pulumi.String(STACK_REF_NAME).ToStringOutput()
			Expect(name).To(Equal(expected))
		})

		It("Should have a valid output", func() {
			output := mock.GetOutput(pulumi.String("foo"))
			expected := pulumi.Any("bar")
			Expect(output).To(Equal(expected))
		})
	})
})
```

#### d. Re-run the tests

```bash
$ go test ./...
PASS! -- 2 Passed | 0 Failed | 0 Pending | 0 Skipped
```

### 5. Implement the concrete type

Confident with the inputs and expected outputs, you'll now wrap the actual stack reference.

Create a `real.go` file under the `devstack` package:

```go
package devstack

import "github.com/pulumi/pulumi/sdk/v3/go/pulumi"

// RealStackReference is a real implementation of StackReference using pulumi.NewStackReference.
type RealStackReference struct {
	*pulumi.StackReference
}

// Implement the methods of StackReference interface for RealStackReference
func (r *RealStackReference) Name() pulumi.StringOutput {
	return r.StackReference.Name
}

// GetOutput returns a stack output keyed by the given name as an Output
func (r *RealStackReference) GetOutput(name pulumi.StringInput) pulumi.AnyOutput {
	return r.StackReference.GetOutput(name)
}
```

### 5. Using the concrete type

Below is a trivial example using a stack reference after we tested the code.

The `dev.go` contents now reads:

```go
package devstack

import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

const STACK_REF_NAME = "myOrg/myProject/myStack"

// StackReference is an interface that wraps the methods of pulumi.StackReference.
type StackReference interface {
	Name() pulumi.StringOutput
	GetOutput(name pulumi.StringInput) pulumi.AnyOutput
}

func NewStackReference(ctx *pulumi.Context, name string) (StackReference, error) {
	stackRef, err := pulumi.NewStackReference(ctx, name, nil)
	if err != nil {
		return nil, err
	}
	return &RealStackReference{StackReference: stackRef}, nil
}

func Go() {
	pulumi.Run(func(ctx *pulumi.Context) error {

		// Create a new stack resource
		// The referenced stack must already have been deployed to resolve the reference
		stackRef, err := NewStackReference(ctx, STACK_REF_NAME)
		if err != nil {
			return err
		}

		// Use an output property from the stack reference
		stackRefOutput := stackRef.GetOutput(pulumi.String("foo"))

		// Export the stack reference output
		ctx.Export("stackRefOutput", stackRefOutput)

		return nil
	})
}
```

## Next Steps

You created a simple StackReference interface, developed a mock implementation for testing purposes, and then implemented it with a concrete type.

Mocking is beneficial when dealing with external dependencies or when you want to isolate the code being tested from the actual implementation of certain functionalities. ​​Creating mocks is a common practice in unit testing to isolate the code under test and simulate the behavior of external dependencies. In Go, you can use a mocking library or create your mocks manually.

Check out our codebase to explore more advanced mocking with StackReference and other Pulumi resources. We, ourselves, use mocks to test every part of Pulumi. Because it's open-source, you're welcome to check out how we do mocking for various SDKs and across resources.

- [Generic struct for testing](https://github.com/pulumi/pulumi/blob/master/sdk/go/pulumi/run_test.go#L36)
- [Internal stack reference test in go](https://github.com/pulumi/pulumi/blob/master/sdk/go/pulumi/stack_reference_test.go)
- [Internal mock tests in nodejs](https://github.com/pulumi/pulumi/blob/master/sdk/nodejs/tests_with_mocks/mocks.spec.ts)

[Join our community on Slack](https://slack.pulumi.com/) and let us know what you think!
