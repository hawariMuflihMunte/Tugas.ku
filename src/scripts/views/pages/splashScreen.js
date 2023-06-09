/* eslint-disable max-len */
import Drawer from '../../classes/UtilsDrawer';

const SplashScreen = {
  async render() {
    return `
      ${Drawer.renderInterface()}
      <div class="container col-xxl-12 px-4 py-5 mt-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5" id="jumbotron">
          <div
            class="col-10 col-sm-8 col-lg-8  d-lg-flex justify-content-lg-end">
            <img
              src="/images/hero image1.png" 
              class="img-fluid" 
              alt="hero" 
              width="400"
              loading="lazy">
          </div>
          <div class="col-lg-4">
            <h1
              class="mb-3">
              Manage your task with
              <span class="text-warning">Tugasku</span></h1>
            <p
              class="lead">
              Don't let tasks pile up.
              Use our task management app to easily create lists, prioritize,
              and track progress.
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <a
                href="/#/dashboard"
                class="btn btn-info btn-lg px-4 me-md-2 fw-bold">
                Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
      <section class="benefit bg-light pb-5">
          <div class="container  g-5 py-5 mb-5">
            <div class="row  g-5 py-5 mb-5">
              <div class="col-12 text-center">
                <h1>Benefit</h1>
              </div>
              <div class="col-lg-4">
                <div class="card text-center m-lg-5 m-3">
                  <div class="card-body p-4 my-3">
                    <img src="/icons/task-icon.svg" width="64" alt="">
                    <h5 class="pt-3 pb-3">Track Your Task</h5>
                    <p>
                      A task management application helps you organize
                      your work more efficiently.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card text-center m-lg-5 m-3">
                  <div class="card-body p-4 my-3">
                    <img src="/icons/chart-icon.svg" width="64" alt="">
                    <h5 class="pt-3 pb-3">Increased Productivity</h5>
                    <p>
                      With a task management application,
                      you can focus on the most important tasks and avoid
                      less critical ones.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card text-center m-lg-5 m-3">
                  <div class="card-body p-4 my-3">
                    <img src="/icons/acces-icon.svg" width="64" alt="">
                    <h5 class="pt-3 pb-3">Mobility and Accessibility</h5>
                    <p>
                      With task management applications you can access your
                      tasks wherever you are.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      <footer>
        <div class="container">
          <div class="row">
            <div class="col-12 text-center py-4">
              <span>&copy; 2023 Tugasku</span>
            </div>
          </div>
        </div>
      </footer>
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

    Drawer.renderDrawer();
  }
};

export default SplashScreen;
