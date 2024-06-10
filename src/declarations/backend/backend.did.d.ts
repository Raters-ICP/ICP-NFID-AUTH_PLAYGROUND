import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'createRecord' : ActorMethod<
    [bigint, bigint, number, string],
    {
      'id' : Principal,
      'userId' : bigint,
      'createdAt' : bigint,
      'rate' : number,
      'movieId' : bigint,
      'comment' : string,
    }
  >,
  'deleteRecord' : ActorMethod<
    [Principal],
    {
        'Ok' : {
          'id' : Principal,
          'userId' : bigint,
          'createdAt' : bigint,
          'rate' : number,
          'movieId' : bigint,
          'comment' : string,
        }
      } |
      {
        'Err' : { 'RecordingDoesNotExist' : Principal } |
          { 'UserDoesNotExist' : Principal }
      }
  >,
  'editRecord' : ActorMethod<
    [Principal, bigint, bigint, number, string],
    {
      'id' : Principal,
      'userId' : bigint,
      'createdAt' : bigint,
      'rate' : number,
      'movieId' : bigint,
      'comment' : string,
    }
  >,
  'readRecord' : ActorMethod<
    [Principal],
    [] | [
      {
        'id' : Principal,
        'userId' : bigint,
        'createdAt' : bigint,
        'rate' : number,
        'movieId' : bigint,
        'comment' : string,
      }
    ]
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
