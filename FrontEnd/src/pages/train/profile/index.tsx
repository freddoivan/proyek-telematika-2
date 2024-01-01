import { Layout } from "@/components/Layout";
import Card from "@/components/Profile";
import withAuth from "@/components/hoc/withAuth";
import { TrainerLayout } from "@/components/trainer/TrainerLayout";
import useAuthStore from "@/store/useAuthStore";

export default withAuth(Index, 'all');

function Index() {
  const user = useAuthStore.useUser()
  
  return (
    <TrainerLayout>
      <div className="flex justify-center flex-col items-center overflow-auto layout space-y-4 pb-4">
        <div>
        <Card user={user} />
        </div>
      </div>

    </TrainerLayout>


  );
}
