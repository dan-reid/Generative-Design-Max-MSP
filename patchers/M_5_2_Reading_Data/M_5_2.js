autowatch = 1;
var fileCounter = 0;

function loadfiles(path) {
  var fs = new FileSystemItem(path);
  fs.print_depth_first(0, -1);

  // 	var file = new File(path);
  // 	post(file.filetype + "\n");
}

function FileSystemItem(path) {
  this.folder = new Folder(path);

  this.path = this.folder.pathname + '/';
  this.name = this.folder.filename;

  this.children = [];
  this.subfolders = [];
  this.files = [];
  this.childcount = 0;
  this.sfcount = 0;
  this.fcount = 0;

  this.folder.reset();
  while (!this.folder.end) {
    if (this.folder.filetype == 'fold') {
      this.subfolders[this.sfcount] = this.folder.filename;
      this.sfcount++;
    } else {
      this.files[this.fcount] = this.folder.filename;
      this.fcount++;
    }
    this.folder.next();
  }
  this.folder.close();

  for (var i = 0; i < this.subfolders.length; i++) {
    this.children[i] = new FileSystemItem(this.path + this.subfolders[i]);
    this.childcount++;
  }

  FileSystemItem.prototype.print_depth_first = function(depth, indexToParent) {
    for (var i = 0; i < depth; i++) post('    ');
    post(
      fileCounter +
        ' ' +
        indexToParent +
        '<-->' +
        fileCounter +
        ' (' +
        depth +
        ') ' +
        this.name +
        '\n'
    );
    indexToParent = fileCounter;
    fileCounter++;

    for (var i = 0; i < this.childcount; i++) {
      this.children[i].print_depth_first(depth + 1, indexToParent);
    }
  };
}
