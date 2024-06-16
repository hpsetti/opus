module.exports = {
  filters: {
    highlight(words, searchActivity) {
      if (searchActivity && words) {
        const filterHighlight = searchActivity.split(' ');

        const pattern = `(|\\b)(${filterHighlight.join('|')})`;
        const patternString = new RegExp(pattern, 'gi');
        const filteredText = words.replace(
          patternString,
          '<span class="highlight">$2</span>'
        );
        return filteredText;
      }
      return words;
    }
  },
  computed: {
    filteredData() {
      const searchKey =
        this.searchActivity && this.searchActivity.toLowerCase();
      let data = this.dataList;
      const { selectedColumns } = this;
      if (searchKey) {
        const filterSearch = searchKey.split(' ');

        filterSearch.forEach((search) => {
          data = data.filter((row) =>
            Object.keys(row).some((key) => {
              if (selectedColumns.indexOf(key) === -1) {
                return false;
              }
              return String(row[key]).toLowerCase().indexOf(search) > -1;
            })
          );
        });
      }
      return data;
    }
  }
};
