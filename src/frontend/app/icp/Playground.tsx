"use client";

import React, { useEffect, useState } from "react";
import { SignIdentity } from "@dfinity/agent";
import { IdleOptions } from "@dfinity/auth-client";
import { useInternetIdentity } from "ic-use-internet-identity";

export function Playground() {
  type NFIDConfig = {
    origin?: string;
    application?: {
      name?: string;
      logo?: string;
    };
    identity?: SignIdentity;
    keyType?: "ECDSA" | "Ed25519";
    idleOptions?: IdleOptions;
  };

  const { isLoggingIn, login, clear, identity, loginStatus } =
    useInternetIdentity();

  const [info, setInfo] = useState("");
  const [sign, setSign] = useState("");
  const [pubkey, setPubkey] = useState("");
  const [principal, setPrincipal] = useState("");
  const [signedPrincipal, setSignedPrincipal] = useState("");
  const [verif, setVerif] = useState(false);

  const handleGetDelegation = () => {
    if (identity) {
      const delegation = (identity as any)._delegation;
      if (delegation) {
        setInfo(JSON.stringify(delegation));
      } else {
        console.error("Delegation is undefined");
      }
    } else {
      console.error("Identity is undefined or null");
    }
  };

  const handleLogOut = () => {
    if (identity) {
      setInfo("");
      clear();
    }
  };

  useEffect(() => {
    if (identity) {
      handleGetDelegation();
    }
  }, [identity]);

  function arrayBufferToHex(buffer: any) {
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  const handleGetPrivateKey = async () => {
    const algorithm = {
      name: "ECDSA",
      hash: { name: "SHA-256" },
    };
    if (identity) {
      const { privateKey } = (identity as any)._inner._keyPair;
      const principal = identity.getPrincipal();
      const uint8Array = (principal as any)._arr;
      window.crypto.subtle
        .sign(algorithm, privateKey, uint8Array)
        .then((res) => {
          const text = arrayBufferToHex(res);
          setSignedPrincipal(text);
        });
    } else {
      console.log("Объект с таким ключом не найден.");
    }
  };

  const isVerifyHandler = async () => {
    if (identity) {
      const publicKeyBuffer = new Uint8Array(Buffer.from(pubkey, "hex")); // Преобразуем строку публичного ключа в буфер
      const signatureBuffer = new Uint8Array(Buffer.from(sign, "hex")); // Преобразуем строку подписи в буфер
      const dataBuffer = (identity as any)._principal._arr;

      try {
        const pubKey = await crypto.subtle.importKey(
          "spki",
          publicKeyBuffer,
          {
            name: "ECDSA",
            namedCurve: "P-256",
          },
          true,
          ["verify"]
        );

        const isVerified = await crypto.subtle.verify(
          {
            name: "ECDSA",
            hash: { name: "SHA-256" },
          },
          pubKey,
          signatureBuffer,
          dataBuffer
        );

        setVerif(isVerified);
      } catch (err: any) {
        setVerif(false);
        console.error(err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        {identity ? (
          <div className="flex flex-row gap-20">
            <button
              className="p-6 bg-red-500 rounded-sm"
              onClick={handleLogOut}
            >
              Logout
            </button>
            <button
              className="p-6 bg-green-500 rounded-sm"
              onClick={handleGetDelegation}
            >
              Get Delegation
            </button>
            <button
              className="p-6 bg-blue-500 rounded-sm"
              onClick={handleGetPrivateKey}
            >
              Sign
            </button>
          </div>
        ) : (
          <button className="p-6 bg-blue-500 rounded-sm" onClick={login}>
            Connect ICP
          </button>
        )}
      </div>
      <div className="flex flex-col gap-6 mt-10">
        <p>Delegation</p>
        <textarea
          value={info}
          className="text-black rounded-md w-96 h-32 p-6"
          disabled={true}
        />
      </div>
      <div className="flex flex-col gap-6 mt-10">
        <p>Signed principal</p>
        <textarea
          className="text-black rounded-md w-96 h-32 p-6"
          disabled={true}
          value={signedPrincipal}
        />
      </div>
      <div className="flex flex-col gap-6 mt-6 items-center">
        <p>Compare sign</p>
        <div className="flex flex-row gap-6">
          <div className="flex flex-col">
            <label className="mb-2 text-white">Sign</label>
            <textarea
              id="sign"
              placeholder="sign"
              className="text-black rounded-md w-96 h-32 p-6"
              value={sign}
              onChange={(e) => setSign(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Public Key</label>
            <textarea
              id="pubkey"
              placeholder="public key"
              className="text-black rounded-md w-96 h-32 p-6"
              value={pubkey}
              onChange={(e) => setPubkey(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button
          className="p-6 bg-green-500 rounded-sm max-w-24"
          onClick={isVerifyHandler}
        >
          Verify
        </button>
        <div className={`p-3 text-sm ${verif ? "bg-green-500" : "bg-red-500"}`}>
          {verif ? "True" : "False"}
        </div>
      </div>
    </div>
  );
}
