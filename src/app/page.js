import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="App">
        <h1>get By Role</h1>
        <input type="text" defaultValue="Hello" />
        <button>Click Me</button>
        <button id="test-id">Test id button</button>
      </div>
      <div className="mx-auto w-fit">
        <div>
          <p>
            <Link href="/auth/signup">Signup</Link>
          </p>
          <p>
            <Link href="/auth/signin">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
