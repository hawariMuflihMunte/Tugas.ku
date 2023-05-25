const SplashScreen = {
  async render() {
    return `
      <div class="container__custom">
        <h2>Manage your<br>task<br>with Tugas.ku</h2>
        <img
          src="https://www.purnomoyusgiantorocenter.org/wp-content/uploads/2020/06/placeholder.png"
          loading="lazy"
          alt="placeholder"
        />
        <a href="/#/dashboard" class="btn btn-primary">Dashboard</a>
      </div>
    `.trim();
  },

  async next() {
    console.log('%cWelcome to Tugas.ku :D', `
      padding: 0 4px;
      border-radius: 4px;
      background-color: yellow;
      color: blue;
      font-size: 16px;
    `.trim());
  }
};

export default SplashScreen;
