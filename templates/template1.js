export const template1 = {
    template1: (invoiceData) => `
    <div class="container invoice">
        <div class="invoice-header">
            <div class="row">
                <div class="col-xs-8">
                    <h1>Invoice <small>With Credit</small></h1>
                    <h4 class="text-muted">NO: ${invoiceData.invoiceNumber} | Date: ${invoiceData.date}</h4>
                </div>
                <div class="col-xs-4">
                    <div class="media">
                        <div class="media-left">
                            <img class="media-object logo" src="${invoiceData.logoUrl}" />
                        </div>
                        <ul class="media-body list-unstyled">
                            <li><strong>${invoiceData.companyName}</strong></li>
                            <li>${invoiceData.companyIndustry}</li>
                            <li>${invoiceData.companyAddress}</li>
                            <li>${invoiceData.companyEmail}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="invoice-body">
            <div class="row">
                <div class="col-xs-5">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Company Details</h3>
                        </div>
                        <div class="panel-body">
                            <dl class="dl-horizontal">
                                <dt>Name</dt>
                                <dd><strong>${invoiceData.companyName}</strong></dd>
                                <dt>Industry</dt>
                                <dd>${invoiceData.companyIndustry}</dd>
                                <dt>Address</dt>
                                <dd>${invoiceData.companyAddress}</dd>
                                <dt>Phone</dt>
                                <dd>${invoiceData.companyPhone}</dd>
                                <dt>Email</dt>
                                <dd>${invoiceData.companyEmail}</dd>
                                <dt>Tax NO</dt>
                                <dd class="mono">${invoiceData.companyTaxNumber}</dd>
                                <dt>Tax Office</dt>
                                <dd>${invoiceData.companyTaxOffice}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="col-xs-7">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Customer Details</h3>
                        </div>
                        <div class="panel-body">
                            <dl class="dl-horizontal">
                                <dt>Name</dt>
                                <dd>${invoiceData.customerName}</dd>
                                <dt>Industry</dt>
                                <dd>${invoiceData.customerIndustry}</dd>
                                <dt>Address</dt>
                                <dd>${invoiceData.customerAddress}</dd>
                                <dt>Phone</dt>
                                <dd>${invoiceData.customerPhone}</dd>
                                <dt>Email</dt>
                                <dd>${invoiceData.customerEmail}</dd>
                                <dt>Tax NO</dt>
                                <dd class="mono">${invoiceData.customerTaxNumber}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Services / Products</h3>
                </div>
                <table class="table table-bordered table-condensed">
                    <thead>
                        <tr>
                            <th>Item / Details</th>
                            <th class="text-center colfix">Unit Cost</th>
                            <th class="text-center colfix">Sum Cost</th>
                            <th class="text-center colfix">Discount</th>
                            <th class="text-center colfix">Tax</th>
                            <th class="text-center colfix">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invoiceData.items.map(item => `
                        <tr>
                            <td>${item.description}<br><small class="text-muted">${item.details}</small></td>
                            <td class="text-right"><span class="mono">${item.unitCost}</span><br><small class="text-muted">Before Tax</small></td>
                            <td class="text-right"><span class="mono">${item.sumCost}</span><br><small class="text-muted">${item.units} Units</small></td>
                            <td class="text-right"><span class="mono">${item.discount}</span><br><small class="text-muted">${item.discountNote}</small></td>
                            <td class="text-right"><span class="mono">${item.tax}</span><br><small class="text-muted">${item.taxNote}</small></td>
                            <td class="text-right"><strong class="mono">${item.total}</strong><br><small class="text-muted mono">${item.subtotal}</small></td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
            <div class="panel panel-default">
                <table class="table table-bordered table-condensed">
                    <thead>
                        <tr>
                            <td class="text-center col-xs-1">Sub Total</td>
                            <td class="text-center col-xs-1">Discount</td>
                            <td class="text-center col-xs-1">Total</td>
                            <td class="text-center col-xs-1">Tax</td>
                            <td class="text-center col-xs-1">Final</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th class="text-center rowtotal mono">${invoiceData.subTotal}</th>
                            <th class="text-center rowtotal mono">${invoiceData.totalDiscount}</th>
                            <th class="text-center rowtotal mono">${invoiceData.total}</th>
                            <th class="text-center rowtotal mono">${invoiceData.totalTax}</th>
                            <th class="text-center rowtotal mono">${invoiceData.finalTotal}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="row">
                <div class="col-xs-7">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <i>Comments / Notes</i>
                            <hr style="margin:3px 0 5px" /> ${invoiceData.comments}
                        </div>
                    </div>
                </div>
                <div class="col-xs-5">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Payment Method</h3>
                        </div>
                        <div class="panel-body">
                            <p>${invoiceData.paymentNote}</p>
                            <ul class="list-unstyled">
                                ${invoiceData.paymentMethods.map(method => `<li>${method.bank} - <span class="mono">${method.account}</span></li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="invoice-footer">
            ${invoiceData.footerNote}
        </div>
    </div>`;
    }
};

