import {
  APTOS_CONNECT_ACCOUNT_URL,
  AboutAptosConnect,
  AboutAptosConnectEducationScreen,
  AnyAptosWallet,
  AptosPrivacyPolicy,
  WalletItem,
  groupAndSortWallets,
  isAptosConnectWallet,
  isInstallRequired,
  truncateAddress,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { ArrowLeft, ArrowRight, ChevronDown, Copy, LogOut, User, User2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@heroui/button";
import { 
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/dropdown";
import { 
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure
} from "@heroui/modal";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { useNavigate } from "react-router-dom";

// Custom toast hook (you'll need to implement this or use a toast library)
const useToast = () => ({
  toast: ({ title, description, variant }: { title: string; description: string; variant?: string }) => {
    // Implement your toast logic here or use react-hot-toast, sonner, etc.
    console.log(`${title}: ${description}`);
  }
});

export function WalletSelector() {
  const { account, connected, disconnect, wallet } = useWallet();
  const { toast } = useToast();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const copyAddress = useCallback(async () => {
    if (!account?.address) return;
    try {
      await navigator.clipboard.writeText(account.address);
      toast({
        title: "Success",
        description: "Copied wallet address to clipboard.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy wallet address.",
      });
    }
  }, [account?.address, toast]);

  const navigate = useNavigate();

  return connected ? (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="solid">
          {account?.ansName || truncateAddress(account?.address) || "Unknown"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Wallet actions">
        <DropdownItem
          key="profile"
          startContent={<User2 className="h-4 w-4" />}
          onPress={() => navigate("/profile")}
        >
          My Profile
        </DropdownItem>
        <DropdownItem
          key="copy"
          startContent={<Copy className="h-4 w-4" />}
          onPress={copyAddress}
        >
          Copy address
        </DropdownItem>
        {wallet && isAptosConnectWallet(wallet) && (
          <DropdownItem key="account" startContent={<User className="h-4 w-4" />}>
            <Link
              href={APTOS_CONNECT_ACCOUNT_URL}
              isExternal
              className="w-full"
            >
              Account
            </Link>
          </DropdownItem>
        )}
        <DropdownItem
          key="disconnect"
          startContent={<LogOut className="h-4 w-4" />}
          onPress={disconnect}
          className="text-danger"
          color="danger"
        >
          Disconnect
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ) : (
    <>
      <Button onPress={onOpen} variant="solid">
        Connect Wallet
      </Button>
      <ConnectWalletModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

interface ConnectWalletModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function ConnectWalletModal({ isOpen, onOpenChange }: ConnectWalletModalProps) {
  const { wallets = [] } = useWallet();
  const { aptosConnectWallets, availableWallets, installableWallets } = groupAndSortWallets(wallets);
  const [showMoreWallets, setShowMoreWallets] = useState(false);

  const hasAptosConnectWallets = !!aptosConnectWallets.length;

  const closeModal = () => onOpenChange(false);

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      size="md"
    >
      <ModalContent>
        {(onClose) => (
          <AboutAptosConnect renderEducationScreen={renderEducationScreen}>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-center leading-snug">
                {hasAptosConnectWallets ? (
                  <>
                    <div>Log in or sign up</div>
                    <div>with Social + Aptos Connect</div>
                  </>
                ) : (
                  "Connect Wallet"
                )}
              </h2>
            </ModalHeader>
            <ModalBody className="pb-6">
              {hasAptosConnectWallets && (
                <div className="flex flex-col gap-3">
                  {aptosConnectWallets.map((wallet) => (
                    <AptosConnectWalletRow key={wallet.name} wallet={wallet} onConnect={closeModal} />
                  ))}
                  <div className="flex gap-1 justify-center items-center text-default-500 text-sm">
                    Learn more about{" "}
                    <AboutAptosConnect.Trigger className="flex gap-1 items-center text-foreground cursor-pointer">
                      Aptos Connect <ArrowRight size={16} />
                    </AboutAptosConnect.Trigger>
                  </div>
                  <AptosPrivacyPolicy className="flex flex-col items-center py-1">
                    <p className="text-xs leading-5 text-center">
                      <AptosPrivacyPolicy.Disclaimer />{" "}
                      <AptosPrivacyPolicy.Link className="text-default-500 underline underline-offset-4" />
                      <span className="text-default-500">.</span>
                    </p>
                    <AptosPrivacyPolicy.PoweredBy className="flex gap-1.5 items-center text-xs leading-5 text-default-500" />
                  </AptosPrivacyPolicy>
                  <div className="flex items-center gap-3 py-4">
                    <Divider className="flex-1" />
                    <span className="text-default-500 text-sm">Or</span>
                    <Divider className="flex-1" />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3">
                {availableWallets.map((wallet) => (
                  <WalletRow key={wallet.name} wallet={wallet} onConnect={closeModal} />
                ))}
                {!!installableWallets.length && (
                  <div className="flex flex-col gap-3">
                    <Button 
                      size="sm" 
                      variant="light" 
                      className="gap-2"
                      onPress={() => setShowMoreWallets(!showMoreWallets)}
                    >
                      More wallets <ChevronDown className={showMoreWallets ? "rotate-180" : ""} />
                    </Button>
                    {showMoreWallets && (
                      <div className="flex flex-col gap-3">
                        {installableWallets.map((wallet) => (
                          <WalletRow key={wallet.name} wallet={wallet} onConnect={closeModal} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </ModalBody>
          </AboutAptosConnect>
        )}
      </ModalContent>
    </Modal>
  );
}

interface WalletRowProps {
  wallet: AnyAptosWallet;
  onConnect?: () => void;
}

function WalletRow({ wallet, onConnect }: WalletRowProps) {
  return (
    <WalletItem
      wallet={wallet}
      onConnect={onConnect}
      className="flex items-center justify-between p-4 gap-4 border border-default-200 rounded-lg hover:bg-default-50"
    >
      <div className="flex items-center gap-4">
        <WalletItem.Icon className="h-6 w-6" />
        <WalletItem.Name className="text-base font-normal" />
      </div>
      {isInstallRequired(wallet) ? (
        <WalletItem.InstallLink>
          <Button size="sm" variant="ghost">
            Install
          </Button>
        </WalletItem.InstallLink>
      ) : (
        <WalletItem.ConnectButton>
          <Button size="sm" variant="solid">
            Connect
          </Button>
        </WalletItem.ConnectButton>
      )}
    </WalletItem>
  );
}

function AptosConnectWalletRow({ wallet, onConnect }: WalletRowProps) {
  return (
    <WalletItem wallet={wallet} onConnect={onConnect}>
      <WalletItem.ConnectButton>
        <Button size="lg" variant="bordered" className="w-full gap-4">
          <WalletItem.Icon className="h-5 w-5" />
          <WalletItem.Name className="text-base font-normal" />
        </Button>
      </WalletItem.ConnectButton>
    </WalletItem>
  );
}

function renderEducationScreen(screen: AboutAptosConnectEducationScreen) {
  return (
    <>
      <ModalHeader className="grid grid-cols-[1fr_4fr_1fr] items-center">
        <Button variant="light" size="sm" isIconOnly onPress={screen.cancel}>
          <ArrowLeft />
        </Button>
        <h3 className="text-base text-center">About Aptos Connect</h3>
        <div></div>
      </ModalHeader>

      <ModalBody className="pb-6">
        <div className="flex h-[162px] pb-3 items-end justify-center">
          <screen.Graphic />
        </div>
        <div className="flex flex-col gap-2 text-center pb-4">
          <screen.Title className="text-xl" />
          <screen.Description className="text-sm text-default-500 [&>a]:underline [&>a]:underline-offset-4 [&>a]:text-foreground" />
        </div>

        <div className="grid grid-cols-3 items-center">
          <Button size="sm" variant="light" onPress={screen.back} className="justify-self-start">
            Back
          </Button>
          <div className="flex items-center gap-2 place-self-center">
            {screen.screenIndicators.map((ScreenIndicator, i) => (
              <ScreenIndicator key={i} className="py-4">
                <div className="h-0.5 w-6 transition-colors bg-default-300 [[data-active]>&]:bg-foreground" />
              </ScreenIndicator>
            ))}
          </div>
          <Button size="sm" variant="light" onPress={screen.next} className="gap-2 justify-self-end">
            {screen.screenIndex === screen.totalScreens - 1 ? "Finish" : "Next"}
            <ArrowRight size={16} />
          </Button>
        </div>
      </ModalBody>
    </>
  );
}