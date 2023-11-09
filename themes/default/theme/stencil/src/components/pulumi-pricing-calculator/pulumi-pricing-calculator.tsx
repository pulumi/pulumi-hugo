import { Component, State, h } from '@stencil/core';

type Edition = "team" | "enterprise";
type Duration = "day" | "month";

@Component({
  tag: 'pulumi-pricing-calculator',
  styleUrl: 'pulumi-pricing-calculator.scss',
  shadow: false,
})
export class PulumiPricingCalculator {
  @State()
  edition: Edition = "team";

  @State()
  duration: Duration = "month"

    @State()
  resourceCount: number = 500;

      @State()
  utilization: number = 100;

  @State()
  deploymentsExpanded: boolean = false;

  @State()
  deploymentMinutes: number = 0;

  updateEdition(edition: Edition) {
    this.edition = edition;
  }

  updateDuration(duration: Duration) {
    this.duration = duration;
  }

  getCostPerDeploymentMinute() {
    return 0.01;
  }

  getFreeDeploymentMinutes() {
    if (this.duration === "month") {
        return this.edition === "team" ? 3000 : 0;
    } else {
        return this.edition === "team" ? (3000 / 30) : 0;
    }
  }

  getEstimatedCredits() {
    if (this.duration === "month") {
        return this.resourceCount * (24 * (this.utilization / 100)) * 30
    } else {
        return this.resourceCount * (24 * (this.utilization / 100))
    }
  }

  updateDeploymentsExpanded() {
    this.deploymentsExpanded = !this.deploymentsExpanded
  }

    getFreeCredits() {
         if (this.duration === "month") {
        return this.edition === "team" ? 150000 : 0;
    } else {
        return this.edition === "team" ? (150000 / 30) : 0;
    }
  }

      getCostPerCredit() {
    return this.edition === "team" ? 0.0005 : 0.0015;
  }

  getTotal() {
    if (this.deploymentsExpanded) {
        const deploymentCost = ((this.deploymentMinutes - this.getFreeDeploymentMinutes()) * this.getCostPerDeploymentMinute());
        return ((this.getEstimatedCredits() - this.getFreeCredits()) * this.getCostPerCredit()) + (deploymentCost > 0 ? deploymentCost : 0);

    } else {
            return (this.getEstimatedCredits() - this.getFreeCredits()) * this.getCostPerCredit();

    }
  }

      updateResourceCount(event: CustomEvent) {
        const val = (event.target as HTMLInputElement).value.trim();
        this.resourceCount = val === "" ? 0 : parseInt(val)
    }

          updateUtilization(event: CustomEvent) {
            const val = (event.target as HTMLInputElement).value.trim();
        this.utilization = val === "" ? 1 : parseInt(val)
    }

    updateDeploymentMinutes(event: CustomEvent) {
                const val = (event.target as HTMLInputElement).value.trim();
        this.deploymentMinutes = val === "" ? 0 : parseInt(val)
    }



  render() {
    return (
      <div>
                <h3>Cost estimator</h3>
        <div class="edition">
            <div class="title">Choose a Pulumi Cloud Edition</div> 
            <div class="options">
                <button class={ this.edition === 'team' ? 'active' : null} onClick={() => this.updateEdition("team")}>Team</button>
                <button class={ this.edition === 'enterprise' ? 'active' : null}onClick={() => this.updateEdition("enterprise")}>Enterprise</button>
            </div>
        </div>
        <div class="content">
            <div class="inputs">
                <div class="field">
                    <div class="title">Number of resources</div>
                    <div class="details">
                        <div class="description">
                            All cloud resources cost the same amount in Pulumi Cloud. Look at your cloud account and enter here the number of
                            resources.
                        </div>
                        <div class="input">
                        <input class="resource-count" type="number" min="0" onInput={event => this.updateResourceCount(event as any)} value={this.resourceCount}
                        ></input></div>
                    </div>
                </div>

                <div class="field">
                    <div class="title">Utilization</div>
                    <div class="details">
                        <div class="description">
                            If you have resources that are being spun up and down throughout the day, estimate the percentage of the time the total
                            resource count will be reached.
                        </div>
                        {/* <!-- KMTODO percentage
                        KMTODO slider --> */}
                        <div class="input">
                        <input type="number" min="1" max="100" onInput={event => this.updateUtilization(event as any)} value={this.utilization}></input><span class="percent">%</span>
                        </div>
                    </div>
                </div>

                <div class="deployments">
                    <div class="default">
                    <i class="fas fa-rocket"></i>
                    <div class="details">
                        <div class="title">Add on Pulumi Deployments</div>
                        <div class="subtitle">Run deployments remotely with a button, Git push, or REST API</div>
                    </div>
                    <button onClick={() => this.updateDeploymentsExpanded()}><i class={this.deploymentsExpanded ? "fas fa-plus" : "fas fa-minus"}></i></button>
                    </div>
                    
                
                    <div class={ this.deploymentsExpanded ? "field visible" : "field"}>
                    <div class="title">Deployment minutes per day</div>
                    <div class="details">
                        <div class="description">
                            Deployment minutes refer to the duration of time elapsed when running deployments on Pulumi’s compute. Use your current update times and add buffer for any workflows that need to happen.
                        </div>
                        <div class="input">
                        <input type="number" min="0" onInput={event => this.updateDeploymentMinutes(event as any)} value={this.deploymentMinutes}></input>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="outputs">
                <div class="duration">
                    <button class={ this.duration === 'day' ? 'active' : null} onClick={() => this.updateDuration("day")}>Per day</button>
                    <button  class={ this.duration === 'month' ? 'active' : null} onClick={() => this.updateDuration("month")}>Per month</button>
                </div>
                <div class="items">
                    <div class="item"><span>Estimated credits per month</span><span>{ this.getEstimatedCredits()}</span></div>
                    <div class="item"><span>Free credits included</span><span>{this.getFreeCredits()}</span></div>
                    <div class="item"><span>Cost per credit</span><span>${this.getCostPerCredit()}</span></div>

                    <div class={ this.deploymentsExpanded ? "deployment-total visible" : "deployment-total"}>
                        <div class="subtitle">Deployments</div>
                    <div class="item"><span>Deployment minutes included</span><span>{this.getFreeDeploymentMinutes()}</span></div>
                    <div class="item"><span>Cost per deployment minute</span><span>${this.getCostPerDeploymentMinute()}</span></div>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="total">
                    <span>${this.getTotal()}</span>
                    <span>/</span>
                    <span>{this.duration === "day" ? "day" : "mo"}</span>
                </div>
            </div>
        </div>
      </div>
    );
  }

}
