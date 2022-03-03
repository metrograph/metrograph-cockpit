import React from "react";


class PageTitle extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="flex items-start space-x-4">
        <img src={this.props.icon} height="24" width="24" />
        <p className="text-2xl text-white font-Rajdhani font-bold">
          {this.props.text}
        </p>
      </div>
    )
  }

}

export default PageTitle
