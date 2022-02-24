import python from "../assets/python.svg";
import nodejs from "../assets/node-js.svg";

const jobs = [
  {
    _id: "1",
    name: "Call Weather Data From API",
    info: "V3.5 - GIT ef802b0 - 18 hours ago",
    technologieIcon: python,
    serverConfig: "2vCPUs / 2G RAM",
    serverLocation: "LOCAL",
    status: "ready",
    actionType: "run",
  },
  {
    _id: "2",
    name: "Backup MongoDB to GDrive",
    info: "V1 - Local code",
    technologieIcon: nodejs,
    serverConfig: "1vCPUs / 512M RAM",
    serverLocation: "AWS",
    status: "running",
    actionType: "stop",
  },
  {
    _id: "3",
    name: "Backup SQL to AWS",
    info: "V1 - Local code",
    technologieIcon: nodejs,
    serverConfig: "1vCPUs / 512M RAM",
    serverLocation: "AWS",
    status: "running",
    actionType: "stop",
  }
];
export default jobs;
