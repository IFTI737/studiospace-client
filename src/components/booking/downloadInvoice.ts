import { jsPDF } from "jspdf";
import { formatDate, formatTimeRange } from "@/lib/format";
import { TBooking } from "@/types/booking.types";

// Builds a simple PDF receipt for a confirmed booking and downloads it
export function downloadInvoice(booking: TBooking) {
  const doc = new jsPDF();
  const money = (n: number) => `$${Number(n || 0).toLocaleString("en-US")}`;

  doc.setFillColor(232, 133, 45);
  doc.rect(0, 0, 210, 32, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("StudioSpace", 15, 20);
  doc.setFontSize(11);
  doc.text("Booking Invoice", 195, 20, { align: "right" });

  doc.setTextColor(30, 30, 40);
  doc.setFontSize(10);
  doc.text(`Invoice #: SS-${booking._id.slice(-8).toUpperCase()}`, 15, 45);
  doc.text(`Issued: ${new Date().toLocaleDateString("en-US")}`, 15, 51);
  doc.text(`Status: ${booking.status}`, 15, 57);

  doc.text("Billed to:", 120, 45);
  doc.text(booking.userName || "", 120, 51);
  doc.text(booking.userEmail || "", 120, 57);

  doc.setDrawColor(220, 220, 220);
  doc.line(15, 66, 195, 66);

  const rows: [string, string][] = [
    ["Studio", booking.studioTitle],
    ["Category", booking.category],
    ["Location", booking.studioLocation],
    ["Host", `${booking.hostName} (${booking.hostEmail})`],
    ["Date", formatDate(booking.date)],
    ["Time", formatTimeRange(booking.startTime, booking.hours)],
    ["Guests", String(booking.guests)],
    ["Rate", `${money(booking.hourlyRate)} x ${booking.hours} hour(s)`],
    ["Security deposit (refundable)", money(booking.securityDeposit)],
  ];

  let y = 78;
  doc.setFontSize(11);
  rows.forEach(([label, value]) => {
    doc.setTextColor(110, 110, 120);
    doc.text(label, 15, y);
    doc.setTextColor(30, 30, 40);
    doc.text(String(value ?? ""), 195, y, { align: "right", maxWidth: 110 });
    y += 9;
  });

  doc.line(15, y, 195, y);
  doc.setFontSize(14);
  doc.text("Total", 15, y + 12);
  doc.setTextColor(232, 133, 45);
  doc.text(money(booking.totalPrice), 195, y + 12, { align: "right" });

  doc.setTextColor(140, 140, 150);
  doc.setFontSize(9);
  doc.text("Thank you for creating with StudioSpace.", 105, 285, { align: "center" });

  doc.save(`StudioSpace-invoice-${booking._id.slice(-6)}.pdf`);
}
