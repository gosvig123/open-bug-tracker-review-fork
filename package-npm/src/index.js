module.exports = {
  config: function (project_id) {
    return window.addEventListener("error", (event) => {
      const user_agent = event.currentTarget.navigator.userAgent;
      const platform = event.currentTarget.navigator.userAgentData.platform;
      const browser =
        event.currentTarget.navigator.userAgentData.brands[1].brand;
      const language = event.currentTarget.navigator.language;
      const mobile = event.currentTarget.navigator.userAgentData.mobile;

      const payload = JSON.stringify({
        project_id,
        message: event.message,
        stack_trace: event.stack,
        metadata: {
          user_agent,
          browser,
          mobile,
          platform,
          language,
        },
      });
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      fetch("http://localhost:3000/events", {
        method: "POST",
        body: payload,
        headers: myHeaders,
      }).then((res) => res.json());
    });
  },
};
