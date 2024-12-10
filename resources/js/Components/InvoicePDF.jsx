import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from '@react-pdf/renderer';

const InvoicePDF = ({ storeInfo, sale }) => {
    const styles = StyleSheet.create({
        page: { padding: 30, fontSize: 10, fontFamily: 'Helvetica' },
        header: { textAlign: 'center', marginBottom: 20 },
        storeInfo: { marginBottom: 20, textAlign: 'center' },
        invoiceDetails: {
            marginBottom: 20,
            padding: 10,
            border: '1 solid #000',
            borderRadius: 5,
        },
        table: {
            display: 'table',
            width: 'auto',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#000',
            marginTop: 10,
        },
        tableRow: { flexDirection: 'row' },
        tableHeader: {
            backgroundColor: '#f3f4f6',
            fontWeight: 'bold',
            textAlign: 'center',
            borderBottom: '1 solid #000',
        },
        tableCol: {
            width: '20%',
            padding: 5,
            borderRight: '1 solid #000',
        },
        tableCell: {
            textAlign: 'center',
            padding: 5,
        },
        total: {
            textAlign: 'right',
            marginTop: 10,
            fontSize: 12,
            fontWeight: 'bold',
        },
    });

    return (
        <Document>
            <Page style={styles.page}>
                {/* Encabezado */}
                <View style={styles.header}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{storeInfo.name}</Text>
                    <Text>{storeInfo.address}, {storeInfo.city}</Text>
                    <Text>Teléfono: {storeInfo.phone} | Email: {storeInfo.email}</Text>
                </View>

                {/* Información de la venta */}
                <View style={styles.invoiceDetails}>
                    <Text>Venta ID: {sale.id}</Text>
                    <Text>Fecha: {new Date(sale.date).toLocaleDateString()}</Text>
                    <Text>Cliente: {sale.customerName}</Text>
                </View>

                {/* Tabla de productos */}
                <View style={styles.table}>
                    {/* Encabezado de la tabla */}
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={styles.tableCol}>Producto</Text>
                        <Text style={styles.tableCol}>Cantidad</Text>
                        <Text style={styles.tableCol}>Precio</Text>
                        <Text style={styles.tableCol}>Descuento</Text>
                        <Text style={styles.tableCol}>Total</Text>
                    </View>
                    {/* Filas de la tabla */}
                    {sale.products.map((product, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={styles.tableCol}>{product.name}</Text>
                            <Text style={styles.tableCol}>{product.quantity}</Text>
                            <Text style={styles.tableCol}>${product.price.toFixed(2)}</Text>
                            <Text style={styles.tableCol}>${product.discount.toFixed(2)}</Text>
                            <Text style={styles.tableCol}>
                                ${((product.quantity * product.price) - product.discount).toFixed(2)}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Total de la venta */}
                <Text style={styles.total}>Total: ${sale.total.toFixed(2)}</Text>
            </Page>
        </Document>
    );
};

export default InvoicePDF;
