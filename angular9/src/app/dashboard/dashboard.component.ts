import {
  Component,
  OnInit,
  AfterContentInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../api.service';
import {
  StatsData, mockData, areaData, distanceViolationData1,
  violationCountGraphData2, distanceViolationData2, FileType, fileType, weedData1, WeedStats, diseaseData1, rainfallData
} from '../stats-data';
import * as Highcharts from 'highcharts';
import { ToastService } from '../_services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

interface lan {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterContentInit {
  panelOpenState = false;
  public graphicalData: StatsData[];
  isChangeLocation: boolean;
  public areaData: StatsData[] = areaData;
  public selectedArea: StatsData;
  public weedStat: WeedStats;
  currentVideo: string;
  isVideoLoaded: boolean;
  isPlay = false;
  isCreateAlert: boolean;
  isWaterAlert: boolean;
  violationLevel: boolean;
  covidSummary;
  isShareOpen: boolean;
  isShareOpen1: boolean;
  isActive;
  isActiveShare;
  public init = false;
  public cropRecommend = false;
  public waterInfo = false;
  public mod1 = false;
  public sec2 = false;
  public mod3 = false;
  public isPost = false;
  public imagePath: string = "";
  imgURL: any = "../assets/images/cropOutput.jpg";
  vdUrl: any = "../assets/images/cropOutput.jpg";
  public message: string = "";
  public detect = false;
  public inProgress = false;
  public img = true;
  public url;
  public format;
  public isFile = fileType;
  public sec3 = false;
  public count = false;
  public leafInfo: number = 30;
  public leafStatus: string;
  public win;
  public crop: string;
  public fertilizer: string;
  public interCrop: string;
  public irrigation: string;
  public irrigation1: string;

  lineChart1: {};
  barGraph1: {};
  lineChart2: {};
  pieChart1: {};
  pieChart2: {};
  barGraph2: {};
  selectedLineChart: {};
  selectedGraph: {};
  Highcharts = Highcharts;

  languages: lan[] = [
    { value: 'en', viewValue: 'English' },
    { value: 'hi', viewValue: 'Hindi' },
    { value: 'pn', viewValue: 'Punjabi' }
  ];

  @ViewChild('videoPlayer', { static: false }) videoplayer: ElementRef;

  constructor(private apiService: ApiService, public toastService: ToastService, private spinner: NgxSpinnerService, private window: Window) {
    this.isChangeLocation = false;
    this.currentVideo = '../../assets/video/Output_SocDis_Area_1.mp4';
    this.isVideoLoaded = true;
    this.violationLevel = true;
    this.isShareOpen = false;
    this.isShareOpen1 = false;
    this.win = this.window;

    function addScript(url) {
      var script = document.createElement('script');
      script.type = 'application/javascript';
      script.src = url;
      document.head.appendChild(script);
    }

    addScript('https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js');


  }

  showSuccess(headerText, successMsg) {
    this.toastService.show(successMsg, {
      classname: 'bg-success text-light',
      delay: 3000,
      autohide: true,
      headertext: headerText
    });
  }

  public ngOnInit(): void {
    this.selectedArea = areaData[1];
    this.lineChart1 = rainfallData;
    this.barGraph1 = distanceViolationData1;
    this.barGraph2 = distanceViolationData2;
    this.selectedLineChart = this.lineChart1;
    this.lineChart2 = rainfallData;
    this.selectedGraph = this.barGraph1;
    this.pieChart1 = weedData1;
    this.pieChart2 = diseaseData1;

    this.setLeafStatus(this.leafInfo);

    this.apiService.getData().subscribe((data: StatsData[]) => {
      console.log(data);
      this.graphicalData = data;
    });
    this.selectedLineChart = this.lineChart1;
    this.selectedGraph = this.selectedArea === areaData[1] ? this.barGraph2 : this.barGraph1;

    this.crop = 'Rice';
    this.fertilizer = 'Blue-green algae and Azolla';
    this.interCrop = 'Black Gram';
    this.irrigation = 'Low Irrigation Required';
    this.irrigation1 = 'Medium Irrigation Required';
  }

  ngAfterContentInit() { }

  openChangeLocationPopup() {
    this.isChangeLocation = true;
  }

  closeChangeLocationPopup() {
    this.isChangeLocation = false;
  }

  openCreateAlertPopup() {
    this.isCreateAlert = true;
    this.isPost = false;
    this.img = false;
  }

  goToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
    this.panelOpenState = true;
  }

  setLeafStatus(leafInfo: number) {
    if (leafInfo > 50) {
      this.leafStatus = 'Unhealthy Diseased';
    } else if (leafInfo < 50 && leafInfo > 20) {
      this.leafStatus = 'Medium';
    } else {
      this.leafStatus = 'Green Healthy'
    }
  }

  openIrrigationPopup() {
    this.isWaterAlert = true;
    this.isPost = false;
    this.img = false;
    this.sec3 = true;
    this.cropRecommend = false;
  }

  getCount() {
    this.count = !this.count;
  }

  closeCreateAlertPopup() {
    this.isCreateAlert = false;
  }

  closeIrrigationPopup() {
    this.isWaterAlert = false;
  }

  createTrueAlert() {
    this.showSuccess('', 'Search Based on Soil Composition');
    this.closeCreateAlertPopup();
    this.cropRecommend = true;
    this.module2();
  }

  createFalseAlert() {
    this.showSuccess('', 'Search Based on Location');
    this.closeCreateAlertPopup();
    this.cropRecommend = false;
    this.module3();
  }

  createWaterTrueAlert() {
    this.showSuccess('', 'Irrigation is done in last 2 days');
    this.closeIrrigationPopup();
    this.waterInfo = true;
    this.watermodule1();
  }

  createWaterFalseAlert() {
    this.showSuccess('', 'Irrigation not done in last 2 days');
    this.closeIrrigationPopup();
    this.waterInfo = false;
    this.watermodule2();
  }

  watermodule1() {
    this.waterInfo = true;
    this.mod3 = false;
    this.mod1 = false;
    this.sec2 = true;
    this.isPost = false;
    this.img = false;
  }

  watermodule2() {
    this.waterInfo = false;
    this.mod3 = false;
    this.mod1 = false;
    this.sec2 = true;
    this.isPost = false;
    this.img = false;
  }

  module3() {
    this.mod3 = true;
    this.mod1 = false;
    this.isPost = false;
    this.img = false;
    this.sec2 = false;
    this.cropRecommend = false;
  }

  shareNow(e) {
    e.target.innerHTML = "Downloading..."

    // Capturing entire page report and saving as pdf
    const workerHtml2pdf = this.win.html2pdf(document.body);
    workerHtml2pdf.then(() => {
      this.showSuccess('Success', 'Downloaded successfully !');
      e.target.innerHTML = "Download as PDF";
    });
  }

  changeLocation() {
    this.selectedArea = this.selectedArea === areaData[1] ? areaData[0] : areaData[1];
    this.selectedLineChart = this.lineChart1;
    this.selectedGraph = this.selectedArea === areaData[1] ? this.barGraph2 : this.barGraph1;
    this.switchVideo();
    this.closeChangeLocationPopup();
    this.showSuccess('Success', 'Location has been changed.');
  }

  public onClick() {
    this.init = true;
  }

  public module1() {
    this.mod1 = true;
    this.mod3 = false;
    this.sec2 = false;
    this.cropRecommend = false;
    this.isPost = false;
    this.img = false;
  }

  public submit() {
    this.isPost = true;
    this.cropRecommend = false;
    this.sec2 = false;
  }

  public module2() {
    this.mod1 = false;
    this.mod3 = false;
    this.sec2 = true;
    this.isPost = false;
    this.cropRecommend = true;
    this.img = false;
  }

  preview(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

  }

  public onSelectFile(event) {
    this.detect = false;
    this.isFile.img = false;
    this.isFile.vdo = false;
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('image') > -1) {
        this.format = 'image';
        this.isFile.img = true;
      } else if (file.type.indexOf('video') > -1) {
        this.format = 'video';
        this.isFile.vdo = true;
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }

  public analyze() {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.detect = true;

    }, 1000);
  }


  switchVideo() {
    this.isVideoLoaded = false;
    if (this.selectedArea === areaData[0]) {
      this.isVideoLoaded = true;
      this.currentVideo = '../../assets/video/Output_SocDis_Area_2.mp4';
    } else {
      this.currentVideo = '../../assets/video/Output_SocDis_Area_1.mp4';
    }
  }
}
