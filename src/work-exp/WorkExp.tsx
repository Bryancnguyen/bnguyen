import React, { useCallback } from "react";
import "./workExp.scss";
import Panel from "../panel/Panel";
import ExpBar from "./exp-bar/ExpBar";
import Badges from "./badges/Badges";

enum Links {
  LYRA = 'https://www.lyrahealth.com/',
  MATTERPORT = 'https://matterport.com/',
  ELLIEMAE = 'https://www.elliemae.com/',
}

function calculatePercentage(months: number) {
  const totalMonths = 81;
  const monthPercentage = (months / totalMonths) * 100;
  return monthPercentage;
}

const matterportExp = calculatePercentage(22);
const matterportBadges = [
  "Typescript",
  "ReactJS",
  "Preact",
  "ThreeJS",
  "NodeJS",
  "Jest",
];

const ellieMaeDevExp = calculatePercentage(15);
const ellieMae1Badges = [
  "AngularJS",
  "NodeJS",
  "Mocha",
  "Jasmine",
  "Karma",
];

const ellieMaeDevInternExp = calculatePercentage(13);
const ellieMaeDevInternBadges = [
  "AngularJS",
  "Wordpress",
  "PHP",
  "Content Management System",
];

const ellieMaeQAExp = calculatePercentage(31);
const ellieMaeQABadges = [
  "Java",
  "Selenium",
  "Appium",
  "WebDriverIO",
  "SoapUI",
  "Post Man",
];

export const WorkExp = () => {
  const navigateToLink = useCallback((link: Links) => {
    window.open(link, '_black');
  }, []);

  return (
    <div id="work-exp">
      <Panel>
        <div className="header" onClick={() => navigateToLink(Links.MATTERPORT)}>Matterport</div>
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
        <p>
          Showcase was a viewer for the a 3D model that a user could
          interact with and could be embed within webpages
            </p>
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
        <div className="header" onClick={() => navigateToLink(Links.ELLIEMAE)}> Ellie Mae</div>
        <div className="sub-header">Software Engineer I / II</div>
        <ExpBar
          text={"1 Year 5 Months"}
          color={"#8dffa2"}
          percentage={ellieMaeDevExp}
        />
        <p>
          Worked on developing TPO Connect and TPO Admin, a web portal
          that allowed investors and lenders to collaborate with their
          customers
            </p>
        <p>
          TPO Connect had a rich set of features such as uploading
          documents, ordering credit, and processing a loan from end to
          end
            </p>
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
        <div className="header" onClick={() => navigateToLink(Links.ELLIEMAE)}>Ellie Mae</div>
        <div className="sub-header">Software Engineer Dev Intern</div>
        <ExpBar
          text={"1 Year 1 Months"}
          color={"#ffa28d"}
          percentage={ellieMaeDevInternExp}
        />
        <p>
          Worked on developing a content management system using Wordpress
          and AngularJS
            </p>
        <p>
          Content management system was intended to be the source of truth
          for re-usable UI components
            </p>
        <p>
          Content management system would allow UX designers and engineers
          to collaborate when creating components that all teams could
          bootstrap
            </p>
        <Badges badges={ellieMaeDevInternBadges} />
        <div className="header" onClick={() => navigateToLink(Links.ELLIEMAE)}>Ellie Mae</div>
        <div className="sub-header">QA Engineer</div>
        <ExpBar
          text={"2 Year 7 Months"}
          color={"#ffdb8d"}
          percentage={ellieMaeQAExp}
        />
        <p>
          Worked as an automation QA Engineer creating scripts that tested
          Ellie Mae's web application
            </p>
        <p>
          Responsible for writing test cases and designing automation
          framework
            </p>
        <p>
          Worked as a manual tester for Encompass, a desktop application
          that ran only on Windows
            </p>
        <p>
          Worked as a manual tester for TPO, a web based application
          developed with PHP
            </p>
        <Badges badges={ellieMaeQABadges} />
      </Panel>
    </div>
  );
};


export default WorkExp;
