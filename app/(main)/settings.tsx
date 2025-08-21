import { useAuth } from "@/AuthContext";
import Button from "@/components/Button";
import Page from "@/components/Page";

export default function Settings() {
  const { signOut } = useAuth();
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