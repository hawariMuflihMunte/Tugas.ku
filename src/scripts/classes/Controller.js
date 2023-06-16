import Swal from "sweetalert2";

/* eslint-disable max-len */
class Controller {
  /**
   * Init Backlog and Presenter classes.
   * @param {class} Backlog
   * @param {class} Presenter
   */
  constructor(Backlog, Presenter) {
    this.backlog = Backlog;
    this.presenter = Presenter;

    this.renderList();

    if (
      this.backlog != null ||
      (this.backlog != undefined && this.presenter != null) ||
      this.presenter != undefined
    ) {
      const currentLocation = window.location.hash.substring(2);
      const removeThirdArgs = currentLocation.split('/');
      const nowLocation = removeThirdArgs[0];
      console.log(`BPC init: ${nowLocation}`);
    } else {
      console.error('Please initiate Backlog and/or Presenter class!');
    }
  }

  addData(data) {
    const currentData = this.backlog.getData();
    const checkDuplicateData = currentData.find((_data) => {
      return _data.title === data.title;
    });

    if (checkDuplicateData) {
      alert('Same data is exists!');
      return false;
    }

    this.backlog.addData(data);
    this.renderList();
  }

  updateData(id, data) {
    this.backlog.updateDataById(id, data);
    this.renderDetail(id);
  }

  renderList() {
    const data = this.backlog.getData();
    this.presenter.renderList(data);
  }

  renderDetail(id) {
    const data = this.backlog.getDataById(id);
    // Debugging purpose-only
    // console.log(data);
    this.presenter.renderDetail(data);
  }

  deleteData(id) {
    if (this.backlog.deleteData(id)) {
      // Debugging purpose-only
      // console.log(this.backlog.getData());

      return true;
    } else {
      console.error('Error while deleting data from data storage.');
    }
  }

  searchData() {
    const searchBar = document.getElementById('search-bar');
    const searchQuery = (searchBar.value).trim().toLowerCase();
    const data = this.backlog.getData();

    const renderSearchResult = (result) => {
      searchBar.value = '';
      this.presenter.renderList(result);
    };

    if (!searchQuery) {
      renderSearchResult(data);
      return false;
    }

    const searchResult = data.filter((task) =>
      (task.title.trim().toLowerCase()).includes(searchQuery)
    );

    if (searchResult.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Task Not Found',
        text: 'We cannot find the task you are looking for. Perhaps it has been deleted, or you can try to use a different search keyword.'
      });

      renderSearchResult(data);
      return false;
    }

    renderSearchResult(searchResult);
    return true;
  }
};

export default Controller;
