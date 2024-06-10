export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createRecord' : IDL.Func(
        [IDL.Nat64, IDL.Nat64, IDL.Int16, IDL.Text],
        [
          IDL.Record({
            'id' : IDL.Principal,
            'userId' : IDL.Nat64,
            'createdAt' : IDL.Nat64,
            'rate' : IDL.Int16,
            'movieId' : IDL.Nat64,
            'comment' : IDL.Text,
          }),
        ],
        [],
      ),
    'deleteRecord' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Principal,
              'userId' : IDL.Nat64,
              'createdAt' : IDL.Nat64,
              'rate' : IDL.Int16,
              'movieId' : IDL.Nat64,
              'comment' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'RecordingDoesNotExist' : IDL.Principal,
              'UserDoesNotExist' : IDL.Principal,
            }),
          }),
        ],
        [],
      ),
    'editRecord' : IDL.Func(
        [IDL.Principal, IDL.Nat64, IDL.Nat64, IDL.Int16, IDL.Text],
        [
          IDL.Record({
            'id' : IDL.Principal,
            'userId' : IDL.Nat64,
            'createdAt' : IDL.Nat64,
            'rate' : IDL.Int16,
            'movieId' : IDL.Nat64,
            'comment' : IDL.Text,
          }),
        ],
        [],
      ),
    'readRecord' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Opt(
            IDL.Record({
              'id' : IDL.Principal,
              'userId' : IDL.Nat64,
              'createdAt' : IDL.Nat64,
              'rate' : IDL.Int16,
              'movieId' : IDL.Nat64,
              'comment' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
