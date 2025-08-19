import Page from "@/components/Page";
import Button from "@/components/Button";
import { useUser } from "@/UserContext";

export default function Settings() {
  const { signOut } = useUser();
  return (
    <Page>
      <Button
        text="Sign out"
        onPress={() => {
          try {
            signOut();
          } catch (e) {
            console.error(e);
          }
        }}
      />
    </Page>
  );
}