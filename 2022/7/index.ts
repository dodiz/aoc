import { input, inputMock } from "./input";

class FSFile {
  name: string = "";
  size: number = 0;
  constructor(name: string, size: number) {
    this.size = size;
    this.name = name;
  }
}

class FSDirectory {
  size = 0;
  name: string = "";
  directories: FSDirectory[] = [];
  parentDirectory: FSDirectory | null;
  files: FSFile[] = [];

  constructor(name: string, parentDirectory?: FSDirectory) {
    this.parentDirectory = parentDirectory || null;
    this.name = name;
  }

  calcSize(): number {
    const filesSize = this.files.reduce((acc, curr) => acc + curr.size, 0);
    const subDirectoriesSize = this.directories.reduce(
      (acc, curr) => acc + curr.calcSize(),
      0
    );
    const size = filesSize + subDirectoriesSize;
    this.size = size;
    return size;
  }
  print(tab: number = 0) {
    let space = "";
    for (let i = 0; i < tab; i++) space += "  ";
    console.log(space + "- " + this.name + "(dir, size = " + this.size + ")");
    this.directories.forEach((directory, i) => {
      directory.print(tab + 1);
    });
    space += " ";
    this.files.forEach((f, i) => {
      console.log(space + "- " + f.name + " (file, size = " + f.size);
    });
  }
}

const commands = input.split("\n").splice(1);
const root = new FSDirectory("/");
let pointer: FSDirectory = root;
commands.forEach((command) => {
  const [subCommand, ...rest] = command.split(" ");
  if (subCommand === "$") {
    if (rest[0] === "ls") return;
    if (rest[0] === "cd" && rest[1] === "..")
      pointer = pointer?.parentDirectory || root;
    if (rest[0] === "cd" && rest[1] !== "..")
      pointer = pointer.directories.find(
        (d) => d.name === rest[1]
      ) as FSDirectory;
  }
  //NEW DIRECTORY
  if (subCommand === "dir") {
    const directory = new FSDirectory(rest[0], pointer);
    pointer?.directories.push(directory);
  }
  //NEW FILE
  if (Number(subCommand)) {
    const file = new FSFile(command.split(" ")[1], +subCommand);
    pointer.files.push(file);
  }
});
root.calcSize();
root.print();

function step1() {
  let totalSize = 0;
  function calcTotalSize(pointer: FSDirectory) {
    if (pointer.size <= 100000) totalSize += pointer.size;
    pointer.directories.forEach((d) => {
      calcTotalSize(d);
    });
  }
  calcTotalSize(root);
  console.log(totalSize);
}
function step2() {
  const diskSpace = 70000000;
  const updateSize = 30000000;
  const remainingSpace = diskSpace - root.size;
  const requiredSpace = updateSize - remainingSpace;
  const directoriesCandidatesToDelete: FSDirectory[] = [];
  function findCandidates(pointer: FSDirectory) {
    if (pointer.size >= requiredSpace)
      directoriesCandidatesToDelete.push(pointer);
    pointer.directories.forEach((d) => {
      findCandidates(d);
    });
  }
  findCandidates(root);
  const space = directoriesCandidatesToDelete.reduce(
    (acc, curr) => (curr.size < acc ? curr.size : acc),
    root.size
  );
  console.log(space);
}
step2();
