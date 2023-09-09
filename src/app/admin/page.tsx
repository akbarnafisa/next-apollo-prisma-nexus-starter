import { redirect } from "next/navigation";
import { Session, getSession } from "@auth0/nextjs-auth0";
import AdminForm from "@/app/components/Admin/AdminForm";

const Admin = async () => {
  const session = await isLoggedIn();
  if (!session) redirect("/");

  const isUserAdmin = await isAdmin(session);
  if (!isUserAdmin) redirect("/unauthorized");

  return (
    <>
      <AdminForm />
    </>
  );
};

export default Admin;

async function isLoggedIn() {
  return await getSession();
}

async function isAdmin(session: Session) {
  const user = await prisma.user.findUnique({
    select: {
      email: true,
      role: true,
    },
    where: {
      email: session.user.email,
    },
  });

  console.log("ggwp", {
    user,
  });

  return user?.role === "ADMIN";
}
