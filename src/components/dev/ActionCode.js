let data = {
  uid: "0",
  type: "folder",
  name: "root",
  icon: null,
  path: "",
  children: [
    {
      uid: "1",
      type: "folder",
      name: "cockpit",
      icon: folderIcon,
      path: "/cockpit",
      children: [
        {
          uid: "2",
          type: "folder",
          name: "src",
          icon: folderIcon,
          path: "/cockpit/src",
          children: [
            {
              uid: "3",
              type: "folder",
              icon: folderIcon,
              name: "screens",
              path: "/cockpit/src/screens",
              children: [
                {
                  uid: "4",
                  type: "file",
                  icon: pythonIcon,
                  name: "App.js",
                  path: "/cockpit/src/screens/App.js",
                },
                {
                  uid: "5",
                  type: "file",
                  icon: pythonIcon,
                  name: "index.css",
                  path: "/cockpit/src/screens/index.css",
                },
              ],
            },
          ],
        },
        {
          uid: "6",
          type: "file",
          icon: pythonIcon,
          name: "index.css",
          path: "/cockpit/index.css",
        },
      ],
    },
    {
      uid: "7",
      type: "file",
      icon: pythonIcon,
      name: ".gitignore",
      path: "/.gitignore",
    },
  ],
};
class ActionCode {
  constructor() {}
}

export default ActionCode;
