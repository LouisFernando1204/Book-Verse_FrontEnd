export const idlFactory = ({ IDL }) => {
  const Book = IDL.Record({
    id: IDL.Nat,
    title: IDL.Text,
    file: IDL.Text,
    cover: IDL.Text,
    year: IDL.Nat,
    author: IDL.Principal,
    synopsis: IDL.Text,
    genre: IDL.Text,
  });
  const Task = IDL.Record({
    id: IDL.Nat,
    url: IDL.Text,
    name: IDL.Text,
    point: IDL.Nat,
  });
  return IDL.Service({
    addBook: IDL.Func(
      [IDL.Text, IDL.Text, IDL.Nat, IDL.Text, IDL.Text, IDL.Text],
      [],
      []
    ),
    addTask: IDL.Func([IDL.Text, IDL.Text, IDL.Nat, IDL.Text], [], []),
    addToBookmark: IDL.Func([IDL.Nat], [], []),
    doTask: IDL.Func([IDL.Nat], [], []),
    getAuthorSubscribers: IDL.Func([IDL.Principal], [IDL.Nat], ["query"]),
    getBookReaders: IDL.Func([IDL.Text], [IDL.Nat], ["query"]),
    getBookmarks: IDL.Func([IDL.Principal], [IDL.Vec(IDL.Nat)], ["query"]),
    getBooks: IDL.Func([], [IDL.Vec(Book)], ["query"]),
    getCompletedTasks: IDL.Func([IDL.Principal], [IDL.Vec(IDL.Nat)], ["query"]),
    getCurrentBook: IDL.Func([IDL.Principal], [IDL.Bool, IDL.Text], ["query"]),
    getGenres: IDL.Func([], [IDL.Vec(IDL.Text)], ["query"]),
    getPoints: IDL.Func([IDL.Principal], [IDL.Nat], ["query"]),
    getSubscriptionPrice: IDL.Func([IDL.Principal], [IDL.Nat], ["query"]),
    getTasks: IDL.Func([], [IDL.Vec(Task)], ["query"]),
    getUploadedBooks: IDL.Func([IDL.Principal], [IDL.Vec(Book)], ["query"]),
    getUserSubscriptions: IDL.Func([IDL.Principal], [IDL.Nat], ["query"]),
    goPremium: IDL.Func([IDL.Nat], [], []),
    readBook: IDL.Func([IDL.Text], [], []),
    removeFromBookmark: IDL.Func([IDL.Nat], [], []),
    subscribeAuthor: IDL.Func([IDL.Principal], [], []),
  });
};
export const init = ({ IDL }) => {
  return [];
};
