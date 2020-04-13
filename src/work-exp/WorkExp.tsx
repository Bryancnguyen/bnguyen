import React from "react";
import "./workExp.scss";
import Panel from "../panel/Panel";
import Pie from "./pie/Pie";
import Modal from "../modal/Modal";
import ExpBar from "./exp-bar/ExpBar";
import Badges from "./badges/Badges";
import Button from "../button/Button";
class WorkExp extends React.Component<{}, WorkExpState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      openModal: false,
    };
  }

  private onOpenModal = () => {
    this.setState({ openModal: true });
  };

  private onCloseModal = () => {
    this.setState({ openModal: false });
  };

  private calculatePercentage(months: number) {
    const totalMonths = 70;
    const monthPercentage = (months / totalMonths) * 100;
    return monthPercentage;
  }

  render() {
    const matterportExp = this.calculatePercentage(22);
    const matterportBadges = [
      "Typescript",
      "ReactJS",
      "Preact",
      "ThreeJS",
      "NodeJS",
      "Jest",
    ];

    const ellieMaxExp = this.calculatePercentage(12);
    const ellieMae1Badges = [
      "AngularJS",
      "NodeJS",
      "Mocha",
      "Jasmine",
      "Karma",
    ];

    const ellieMaeDevInternBadges = [
      "AngularJS",
      "Wordpress",
      "PHP",
      "Content Management System",
    ];

    const ellieMaeQABadges = [
      "Java",
      "Selenium",
      "Appium",
      "WebDriverIO",
      "SoapUI",
      "Post Man",
    ];

    return (
      <div id="work-exp">
        <Panel title={"Work Experience"}>
          <Pie onClick={this.onOpenModal} />
          {this.state.openModal && (
            <Modal onClose={this.onCloseModal}>
              <div className="header">Matterport</div>
              <div className="sub-header">Software Engineer</div>
              <ExpBar
                text={"1 Year 10 Months"}
                color={"#ff8db1"}
                percentage={matterportExp}
              />
              <p>
                Worked on researching and creating new user experiences within
                Showcase and Workshop
              </p>
              <hr />
              <p>
                Showcase was a viewer for the a 3D model that a user could
                interact with and could be embed within webpages
              </p>
              <hr />
              <p>
                Workshop was an editor that allowed model owners to edit how a
                model would be presented to the viewer
              </p>
              <iframe
                title="matterport"
                allow="vr"
                height="480"
                width="700"
                src="https://my.matterport.com/show/?m=f6dv1vRds4q"
                id="iFrameResizer0"
                scrolling="no"
              ></iframe>
              <Badges badges={matterportBadges} />
              <div className="header">Ellie Mae</div>
              <div className="sub-header">Software Engineer I / II</div>
              <ExpBar
                text={"1 Year"}
                color={"#8dffa2"}
                percentage={ellieMaxExp}
              />
              <p>
                Worked on developing TPO Connect and TPO Admin, a web portal
                that allowed investors and lenders to collaborate with their
                customers
              </p>
              <hr />
              <p>
                TPO Connect had a rich set of features such as uploading
                documents, ordering credit, and processing a loan from end to
                end
              </p>
              <hr />
              <p>
                TPO Connnect Admin was another web portal that allowed investors
                and lenders to personalize their TPO Connect portal and workflow
              </p>
              <img
                className="tpo-photo"
                alt="TPO Connect"
                src={process.env.PUBLIC_URL + "/images/tpo.png"}
              />
              <Badges badges={ellieMae1Badges} />
              <div className="header">Ellie Mae</div>
              <div className="sub-header">Software Engineer Dev Intern</div>
              <ExpBar
                text={"1 Year"}
                color={"#ffa28d"}
                percentage={ellieMaxExp}
              />
              <p>
                Worked on developing a content management system using Wordpress
                and AngularJS
              </p>
              <hr />
              <p>
                Content management system was intended to be the source of truth
                for re-usable UI components
              </p>
              <hr />
              <p>
                Content management system would allow UX designers and engineers
                to collaborate when creating components that all teams could
                bootstrap
              </p>
              <Badges badges={ellieMaeDevInternBadges} />
              <div className="header">Ellie Mae</div>
              <div className="sub-header">QA Engineer</div>
              <ExpBar
                text={"1 Year"}
                color={"#0AE6E5"}
                percentage={ellieMaxExp}
              />
              <p>
                Worked as an automation QA Engineer creating scripts that tested
                Ellie Mae's web application
              </p>
              <hr />
              <p>
                Responsible for writing test cases and designing automation
                framework
              </p>
              <Badges badges={ellieMaeQABadges} />
              <div className="header">Ellie Mae</div>
              <div className="sub-header">QA Engineer Intern</div>
              <ExpBar
                text={"1 Year"}
                color={"#ffdb8d"}
                percentage={ellieMaxExp}
              />
              <p>
                Worked as a manual tester for Encompass, a desktop application
                that ran only on Windows
              </p>
              <hr />
              <p>
                Worked as a manual tester for TPO, a web based application
                developed with PHP
              </p>
              <Badges badges={ellieMae1Badges} />
            </Modal>
          )}
          <Button text={"Show Experience"} onClick={this.onOpenModal}/>
        </Panel>
      </div>
    );
  }
}

interface WorkExpState {
  openModal: boolean;
}

export default WorkExp;
