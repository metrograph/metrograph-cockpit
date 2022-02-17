import logoFooter from "../assets/logo-footer.svg";
export default function Footer() {
  return (
    <div className="flex mt-44 h-56 border-t-2 border-cock-line items-center ">
      <div className="flex flex-row w-full justify-between mx-32">
        <div className="space-y-4 cursor-pointer">
          <img src={logoFooter} width="134" height="71" />
          <p className="text-sm font-Inter font-regular text-cock-footer cursor-pointer">
            Building and Scaling apps has never been easier!
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-Inter font-semibold text-cock-footer cursor-pointer">
            Marketplace
          </p>
          <p className="text-sm font-Inter font-semibold text-cock-footer cursor-pointer">
            Road Map
          </p>
          <p className="text-sm font-Inter font-semibold text-cock-footer cursor-pointer">
            Pricing
          </p>
          <p className="text-sm font-Inter font-semibold text-cock-footer cursor-pointer">
            Feature Request
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-Inter font-semibold text-cock-footer cursor-pointer">
            About HyperPlan
          </p>
          <p className="text-sm font-Inter font-semibold text-cock-footer cursor-pointer">
            FAQ
          </p>
          <p className="text-sm font-Inter font-semibold text-cock-footer cursor-pointer">
            Contribute
          </p>
          <p className="text-sm font-Inter font-semibold text-cock-footer cursor-pointer">
            Contact Us
          </p>
        </div>
      </div>
    </div>
  );
}
