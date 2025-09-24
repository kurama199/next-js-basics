import { fetchInvoiceById, sql } from "@/app/lib/data";
import { CustomerField } from "@/app/lib/definitions";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import EditInvoiceForm from "@/app/ui/invoices/edit-form";
import { notFound } from "next/navigation";

export default async function editInvoice({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const editInvoiceData = await fetchInvoiceById(id);
  if (!editInvoiceData) {
    notFound();
  }
  const customers = await sql<
    CustomerField[]
  >`SELECT * from customers WHERE ${editInvoiceData.customer_id} = customers.id`;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditInvoiceForm customers={customers} invoice={editInvoiceData} />
    </main>
  );
}
