export default function Footer() {
  return (
      <footer className="flex justify-center items-center bottom-0">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()}
          <a
              className="text-gray-500 hover:text-gray-700"
              href="https://www.yunielacosta.com"/>
        </p>
      </footer>
  );
}