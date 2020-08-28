import React from "react"
import * as Icon from "react-feather"

//To Show Sidebar Menu
const navigationConfig = [

  {
    id: "UserDashboard",
    title: "UserDashboard",
    type: "item",
    icon: <Icon.Home size={20} />,
    //permissions: ["user", "editor"],
    navLink: "/user/dashboard"
  },
  {
    id: "Blog",
    title: "Blog",
    type: "item",
    icon: <Icon.Edit size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/blog"
  },
  {
    id: "Post",
    title: "Your Blog",
    type: "item",
    icon: <Icon.Clipboard size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/post"
  },
  
]

export default navigationConfig
