import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../services/product.service';
import { DatePipe } from '@angular/common';
import { Product } from '../models/product';
import * as Chart from 'chart.js';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private datePipe: DatePipe) { }

  // Date choisie par l'utilisateur
  @Input() date = new Date();

  // liste des produits
  products: Product[];

  labels = [];
  data = [];
  colors = [];

  canvas: any;
  ctx: any;


  ngOnInit() {

  }

  show() {
    this.productService.getProducts(this.date)
    .subscribe(
      (data: Product[]) => {
        this.products = data['posts'];
        this.setCategories(this.products);
        this.pieChart();
      },
      err => {
        console.error(err);
      }
    );
  }

  // retourne la date courante sous format YYYY-MM-dd (fct utilisée pour limiter le datePicker)

  transformDate() {
    const date = new Date();
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }


  setCategories(products: Product[]) {

      // Extraction des categories depuis la liste des produits
      const categories = [];

      for (const i in products) {
      if (products.hasOwnProperty(i)) {
        const product = products[i];
        for (const j in product.topics) {
            if (product.topics.hasOwnProperty(j)) {
              const element = product.topics[j];
              categories.push(element.slug);
            }
          }
      }
    }

    // Construction des tableaux 'label', 'data' et 'colors' pour les entrées de la pie Chart
      for (const h in categories) {
      if (categories.hasOwnProperty(h)) {
        let nbr = 0;
        const element = categories[h];
        nbr = categories.filter(i => i === element).length;
        // si l'élément n'existe pas dans labels
        if (this.labels.indexOf(element) === -1) {
          // ajouter l'élément dans labels
          this.labels.push(element);
          this.data.push(nbr);
          // ajouter une couleur aléatoire
          this.colors.push('rgba(' + this.ran() + "," + this.ran() + "," + this.ran() + ', 1)');
        }
      }
    }

  }

  // génére un nombre alétoire [0..255]
  ran() {
     return Math.floor(Math.random() * 255);
  }

  // Pie chart
  pieChart() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: this.labels,
          datasets: [{
              label: '# of Votes',
              data: this.data,
              backgroundColor: this.colors,
              borderWidth: 1
          }]
      },
      options: {
        responsive: true,
        display:true
      }
    });

  }


}
