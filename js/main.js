var itemList = {
  db: [],
  dd: {
    content: [{
        columns: [{
            alignment: 'right',
            table: {
              widths: ['*', 'auto'],
              body: []
            },
          },
          {
            alignment: 'right',
            table: {
              widths: ['*', 'auto'],
              body: []
            },
          }
        ]
      },
      {
        columns: [{
            alignment: 'right',
            table: {
              widths: ['*', 'auto'],
              body: []
            },
          },
          {
            alignment: 'right',
            table: {
              widths: ['*', 'auto'],
              body: []
            },
          }
        ]
      },
      {
        columns: [{
            alignment: 'right',
            table: {
              widths: ['*', 'auto'],
              body: []
            },
          },
          {
            alignment: 'right',
            table: {
              widths: ['*', 'auto'],
              body: []
            },
          }
        ]
      },
    ],
    defaultStyle: {
      font: 'GenShinGothic',
      fontSize: 10
    },
    styles: {
      barcode: {
        font: 'ean13',
        fontSize: 30
      }
    }
  },
  s: [false, false, false],

  itemSwitch: function(p) {
    this.s[p] = !this.s[p];
    if (this.s[p]) return 0;
    return 1;
  },

  addItem: function(code) {
    var item = [{
      text: this.db.item[code].name,
      margin: [0, 8],
      border: [0, 0, 0, 0]
    }, {
      text: enc_jan(code),
      style: "barcode",
      border: [0, 0, 0, 0]
    }];
    var p = this.db.item[code].pattern;
    if ($('#info [name="pattern"]:checked').val() == 1) {
      if (p == 1) {
        p = 2
      } else if (p == 2) {
        p = 1;
      }
    };
    this.dd.content[p].columns[this.itemSwitch(p)].table.body.push(item);
  },

  setInfo: function() {
    var _super = this;
    $('#info [name="item"]:checked').each(function() {
      var code = $(this).val();
      _super.addItem(code);
    });
    this.dd["pageSize"] = $('#info [name="pagesize"]:checked').val();
  },

  createPDF: function() {
    this.setInfo();
    // delete empty
    for (let i = this.dd.content.length; i > 0; --i) {
      if (this.dd.content[i - 1].columns[0].table.body.length == 0) {
        this.dd.content.splice(i - 1, 1);
      } else if (this.dd.content[i - 1].columns[1].table.body.length == 0) {
        this.dd.content[i - 1].columns.splice(1, 1);
      };
    };

    // drow border
    for (let i = 0; i < this.dd.content.length; ++i) {
      let left = this.dd.content[i].columns[0];
      // // left bottom
      left.table.body[left.table.body.length - 1][0].border = [1, 0, 0, 1];
      left.table.body[left.table.body.length - 1][1].border = [0, 0, 0, 1];

      let right = this.dd.content[i].columns[1];
      // // right bottom
      right.table.body[right.table.body.length - 1][0].border = [0, 0, 0, 1];
      right.table.body[right.table.body.length - 1][1].border = [0, 0, 1, 1];

      for (let j = 0; j < left.table.body.length - 1; j++) {
        left.table.body[j][0].border = [1, 0, 0, 0];
      }
      for (let j = 0; j < right.table.body.length - 1; j++) {
        right.table.body[j][1].border = [0, 0, 1, 0];
      }
    }
    // left top
    this.dd.content[0].columns[0].table.body[0][0].border = [1, 1, 0, 0];
    this.dd.content[0].columns[0].table.body[0][1].border = [0, 1, 0, 0];
    // right top
    this.dd.content[0].columns[1].table.body[0][0].border = [0, 1, 0, 0];
    this.dd.content[0].columns[1].table.body[0][1].border = [0, 1, 1, 0];


    pdfMake.createPdf(this.dd).open();
  }
};

pdfMake.fonts = {
  GenShinGothic: {
    normal: 'GenShinGothic-Normal.ttf'
  },
  ean13: {
    normal: 'ean13.ttf'
  }
};
