import { Toaster } from "react-hot-toast";

function CustomToaster() {
   return (
      <Toaster
         position="bottom-center"
         reverseOrder={true}
         gutter={12}
         containerStyle={{ margin: "8px" }}
         toastOptions={{
            success: { duration: 3000 },
            error: { duration: 2000 },
            style: {
               maxWidth: "100%",
               borderRadius: "15px",
               padding: "12px 18px",
               backgroundColor: "#101114",
               color: "#fff",
               border: "1px solid rgba(0, 0, 0, 0.2)",
            },
         }}
      />
   );
}

export default CustomToaster
