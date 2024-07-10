import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoPdfViewerComponent } from '../mo-pdf-viewer.component';
import * as i0 from "@angular/core";
import * as i1 from "../util.service";
import * as i2 from "@angular/forms";
export class TagPopoverComponent {
    constructor(utilService) {
        this.utilService = utilService;
        this.closePopover = false;
        this.selectedTag = '';
        this.tagListPrivate = [];
        this.tagListPublic = [];
        this.selectedTagPublic = false;
        this.selectedTagPrivate = false;
        this.tagListPrivate = this.utilService.getTagListPrivate();
        this.tagListPublic = this.utilService.getTagListPublic();
    }
    closeTag() {
        const popover = document.querySelector('.tag-popover');
        if (!this.closePopover) {
            popover.style.display = 'none';
        }
        this.closePopover = !this.closePopover;
    }
    storeTag() {
        if (this.selectedTagPublic || this.selectedTagPrivate) {
            const selectedTagText = document.querySelector('.selectedEditor');
            const tagText = selectedTagText?.ariaLabel;
            if (tagText != null) {
                let highlightList = this.utilService.gethighlightText();
                const normalizedTagText = tagText.trim().toLowerCase();
                if (highlightList.some((word) => word.trim().toLowerCase() === normalizedTagText)) {
                    highlightList = highlightList.filter((word) => word.trim().toLowerCase() !== normalizedTagText);
                    console.log('The updated highlightList is: ', highlightList);
                    this.utilService.updatedHighlightList(highlightList);
                }
                if (this.selectedTagPrivate && this.selectedTagPublic) {
                    this.utilService.updateTagListPrivate(tagText);
                    this.utilService.updateTagListPublic(tagText);
                }
                else if (this.selectedTagPrivate) {
                    this.utilService.updateTagListPrivate(tagText);
                }
                else if (this.selectedTagPublic) {
                    this.utilService.updateTagListPublic(tagText);
                }
            }
            this.closeTag();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: TagPopoverComponent, deps: [{ token: i1.UtilService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.11", type: TagPopoverComponent, isStandalone: true, selector: "mo-app-tag-popover", viewQueries: [{ propertyName: "pdfViewer", first: true, predicate: MoPdfViewerComponent, descendants: true }], ngImport: i0, template: "<div class=\"tag-popover\">\r\n  <h4>Tags</h4>\r\n  <button class=\"close-button\" (click)=\"closeTag()\">x</button>\r\n  <div class=\"col-12 d-flex border-clr pt-1\"></div>\r\n  <input\r\n    type=\"checkbox\"\r\n    id=\"tag-public\"\r\n    [(ngModel)]=\"selectedTagPublic\"\r\n    value=\"Public\"\r\n  />\r\n  <label for=\"tag-public\">Public</label><br />\r\n  <input\r\n    type=\"checkbox\"\r\n    id=\"tag-private\"\r\n    [(ngModel)]=\"selectedTagPrivate\"\r\n    value=\"Private\"\r\n  />\r\n  <label for=\"tag-private\">Private</label><br />\r\n  <button\r\n    class=\"ok-button\"\r\n    [disabled]=\"!(selectedTagPublic || selectedTagPrivate)\"\r\n    (click)=\"storeTag()\"\r\n  >\r\n    OK\r\n  </button>\r\n</div>\r\n", styles: [".tag-popover{background:#4c4a4a;border:1px solid #ccc;border-radius:8px;padding:10px;box-shadow:0 2px 10px #0000001a;font-size:small;position:absolute;top:65px;pointer-events:all;color:#fff;width:143px;height:147px}.tag-popover label{margin-left:6px;font-size:15px;letter-spacing:1px}input{font-size:20px}.border-clr{border-bottom:2px solid rgb(255,255,255)}.ok-button{position:absolute;border:none;color:#fff;width:21px;font-size:12px;height:25px;margin-top:13px;background:#1c1c1c82;letter-spacing:1px}.ok-button:hover{background:#000}.close-button{left:84%;top:0;position:absolute;border:none;font-size:17px;color:#fff;width:16px;font-weight:600;height:24px;background:transparent}#tag-public{margin-top:17px}#tag-private{margin-top:13px}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: TagPopoverComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mo-app-tag-popover', standalone: true, imports: [FormsModule], template: "<div class=\"tag-popover\">\r\n  <h4>Tags</h4>\r\n  <button class=\"close-button\" (click)=\"closeTag()\">x</button>\r\n  <div class=\"col-12 d-flex border-clr pt-1\"></div>\r\n  <input\r\n    type=\"checkbox\"\r\n    id=\"tag-public\"\r\n    [(ngModel)]=\"selectedTagPublic\"\r\n    value=\"Public\"\r\n  />\r\n  <label for=\"tag-public\">Public</label><br />\r\n  <input\r\n    type=\"checkbox\"\r\n    id=\"tag-private\"\r\n    [(ngModel)]=\"selectedTagPrivate\"\r\n    value=\"Private\"\r\n  />\r\n  <label for=\"tag-private\">Private</label><br />\r\n  <button\r\n    class=\"ok-button\"\r\n    [disabled]=\"!(selectedTagPublic || selectedTagPrivate)\"\r\n    (click)=\"storeTag()\"\r\n  >\r\n    OK\r\n  </button>\r\n</div>\r\n", styles: [".tag-popover{background:#4c4a4a;border:1px solid #ccc;border-radius:8px;padding:10px;box-shadow:0 2px 10px #0000001a;font-size:small;position:absolute;top:65px;pointer-events:all;color:#fff;width:143px;height:147px}.tag-popover label{margin-left:6px;font-size:15px;letter-spacing:1px}input{font-size:20px}.border-clr{border-bottom:2px solid rgb(255,255,255)}.ok-button{position:absolute;border:none;color:#fff;width:21px;font-size:12px;height:25px;margin-top:13px;background:#1c1c1c82;letter-spacing:1px}.ok-button:hover{background:#000}.close-button{left:84%;top:0;position:absolute;border:none;font-size:17px;color:#fff;width:16px;font-weight:600;height:24px;background:transparent}#tag-public{margin-top:17px}#tag-private{margin-top:13px}\n"] }]
        }], ctorParameters: () => [{ type: i1.UtilService }], propDecorators: { pdfViewer: [{
                type: ViewChild,
                args: [MoPdfViewerComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLXBvcG92ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi90YWctcG9wb3Zlci90YWctcG9wb3Zlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9zcmMvbGliL3RhZy1wb3BvdmVyL3RhZy1wb3BvdmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQVNsRSxNQUFNLE9BQU8sbUJBQW1CO0lBVzlCLFlBQW1CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBVnBDLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLG1CQUFjLEdBQWEsRUFBRSxDQUFDO1FBQzlCLGtCQUFhLEdBQWEsRUFBRSxDQUFDO1FBQzdCLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUNuQyx1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFNekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDM0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFFM0QsQ0FBQztJQUNNLFFBQVE7UUFDYixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBZ0IsQ0FBQztRQUN0RSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUNqQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFFekMsQ0FBQztJQUVNLFFBQVE7UUFDYixJQUFJLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUN0RCxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1QyxpQkFBaUIsQ0FDQSxDQUFDO1lBQ3BCLE1BQU0sT0FBTyxHQUFHLGVBQWUsRUFBRSxTQUFTLENBQUM7WUFFM0MsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ3BCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDeEQsTUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3ZELElBQ0UsYUFBYSxDQUFDLElBQUksQ0FDaEIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxpQkFBaUIsQ0FDMUQsRUFDRCxDQUFDO29CQUNELGFBQWEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUNsQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxLQUFLLGlCQUFpQixDQUMxRCxDQUFDO29CQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsYUFBYSxDQUFDLENBQUM7b0JBQzdELElBQUksQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3ZELENBQUM7Z0JBRUQsSUFBSSxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ3RELElBQUksQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2hELENBQUM7cUJBQU0sSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakQsQ0FBQztxQkFBTSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNoRCxDQUFDO1lBQ0gsQ0FBQztZQUNELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQixDQUFDO0lBQ0gsQ0FBQzsrR0ExRFUsbUJBQW1CO21HQUFuQixtQkFBbUIseUhBUW5CLG9CQUFvQixnRENwQmpDLCt0QkEwQkEsZ3lCRGhCWSxXQUFXOzs0RkFFVixtQkFBbUI7a0JBUC9CLFNBQVM7K0JBQ0Usb0JBQW9CLGNBR2xCLElBQUksV0FDUCxDQUFDLFdBQVcsQ0FBQztnRkFXZixTQUFTO3NCQURmLFNBQVM7dUJBQUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFV0aWxTZXJ2aWNlIH0gZnJvbSAnLi4vdXRpbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTW9QZGZWaWV3ZXJDb21wb25lbnQgfSBmcm9tICcuLi9tby1wZGYtdmlld2VyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ21vLWFwcC10YWctcG9wb3ZlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RhZy1wb3BvdmVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90YWctcG9wb3Zlci5jb21wb25lbnQuc2NzcyddLFxyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgaW1wb3J0czogW0Zvcm1zTW9kdWxlXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhZ1BvcG92ZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBjbG9zZVBvcG92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgc2VsZWN0ZWRUYWc6IHN0cmluZyA9ICcnO1xyXG4gIHB1YmxpYyB0YWdMaXN0UHJpdmF0ZTogc3RyaW5nW10gPSBbXTtcclxuICBwdWJsaWMgdGFnTGlzdFB1YmxpYzogc3RyaW5nW10gPSBbXTtcclxuICBwdWJsaWMgc2VsZWN0ZWRUYWdQdWJsaWM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgc2VsZWN0ZWRUYWdQcml2YXRlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBWaWV3Q2hpbGQoTW9QZGZWaWV3ZXJDb21wb25lbnQpXHJcbiAgcHVibGljIHBkZlZpZXdlciE6IE1vUGRmVmlld2VyQ29tcG9uZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdXRpbFNlcnZpY2U6IFV0aWxTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnRhZ0xpc3RQcml2YXRlID0gdGhpcy51dGlsU2VydmljZS5nZXRUYWdMaXN0UHJpdmF0ZSgpO1xyXG4gICAgdGhpcy50YWdMaXN0UHVibGljID0gdGhpcy51dGlsU2VydmljZS5nZXRUYWdMaXN0UHVibGljKCk7XHJcbiAgICBcclxuICB9XHJcbiAgcHVibGljIGNsb3NlVGFnKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcG9wb3ZlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWctcG9wb3ZlcicpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgaWYgKCF0aGlzLmNsb3NlUG9wb3Zlcikge1xyXG4gICAgICBwb3BvdmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNsb3NlUG9wb3ZlciA9ICF0aGlzLmNsb3NlUG9wb3ZlcjtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0b3JlVGFnKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRUYWdQdWJsaWMgfHwgdGhpcy5zZWxlY3RlZFRhZ1ByaXZhdGUpIHtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRUYWdUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAnLnNlbGVjdGVkRWRpdG9yJ1xyXG4gICAgICApIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICBjb25zdCB0YWdUZXh0ID0gc2VsZWN0ZWRUYWdUZXh0Py5hcmlhTGFiZWw7XHJcblxyXG4gICAgICBpZiAodGFnVGV4dCAhPSBudWxsKSB7XHJcbiAgICAgICAgbGV0IGhpZ2hsaWdodExpc3QgPSB0aGlzLnV0aWxTZXJ2aWNlLmdldGhpZ2hsaWdodFRleHQoKTtcclxuICAgICAgICBjb25zdCBub3JtYWxpemVkVGFnVGV4dCA9IHRhZ1RleHQudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgaGlnaGxpZ2h0TGlzdC5zb21lKFxyXG4gICAgICAgICAgICAod29yZCkgPT4gd29yZC50cmltKCkudG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZFRhZ1RleHRcclxuICAgICAgICAgIClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGhpZ2hsaWdodExpc3QgPSBoaWdobGlnaHRMaXN0LmZpbHRlcihcclxuICAgICAgICAgICAgKHdvcmQpID0+IHdvcmQudHJpbSgpLnRvTG93ZXJDYXNlKCkgIT09IG5vcm1hbGl6ZWRUYWdUZXh0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1RoZSB1cGRhdGVkIGhpZ2hsaWdodExpc3QgaXM6ICcsIGhpZ2hsaWdodExpc3QpO1xyXG4gICAgICAgICAgdGhpcy51dGlsU2VydmljZS51cGRhdGVkSGlnaGxpZ2h0TGlzdChoaWdobGlnaHRMaXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFnUHJpdmF0ZSAmJiB0aGlzLnNlbGVjdGVkVGFnUHVibGljKSB7XHJcbiAgICAgICAgICB0aGlzLnV0aWxTZXJ2aWNlLnVwZGF0ZVRhZ0xpc3RQcml2YXRlKHRhZ1RleHQpO1xyXG4gICAgICAgICAgdGhpcy51dGlsU2VydmljZS51cGRhdGVUYWdMaXN0UHVibGljKHRhZ1RleHQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3RlZFRhZ1ByaXZhdGUpIHtcclxuICAgICAgICAgIHRoaXMudXRpbFNlcnZpY2UudXBkYXRlVGFnTGlzdFByaXZhdGUodGFnVGV4dCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGVkVGFnUHVibGljKSB7XHJcbiAgICAgICAgICB0aGlzLnV0aWxTZXJ2aWNlLnVwZGF0ZVRhZ0xpc3RQdWJsaWModGFnVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2xvc2VUYWcoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cInRhZy1wb3BvdmVyXCI+XHJcbiAgPGg0PlRhZ3M8L2g0PlxyXG4gIDxidXR0b24gY2xhc3M9XCJjbG9zZS1idXR0b25cIiAoY2xpY2spPVwiY2xvc2VUYWcoKVwiPng8L2J1dHRvbj5cclxuICA8ZGl2IGNsYXNzPVwiY29sLTEyIGQtZmxleCBib3JkZXItY2xyIHB0LTFcIj48L2Rpdj5cclxuICA8aW5wdXRcclxuICAgIHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICBpZD1cInRhZy1wdWJsaWNcIlxyXG4gICAgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFRhZ1B1YmxpY1wiXHJcbiAgICB2YWx1ZT1cIlB1YmxpY1wiXHJcbiAgLz5cclxuICA8bGFiZWwgZm9yPVwidGFnLXB1YmxpY1wiPlB1YmxpYzwvbGFiZWw+PGJyIC8+XHJcbiAgPGlucHV0XHJcbiAgICB0eXBlPVwiY2hlY2tib3hcIlxyXG4gICAgaWQ9XCJ0YWctcHJpdmF0ZVwiXHJcbiAgICBbKG5nTW9kZWwpXT1cInNlbGVjdGVkVGFnUHJpdmF0ZVwiXHJcbiAgICB2YWx1ZT1cIlByaXZhdGVcIlxyXG4gIC8+XHJcbiAgPGxhYmVsIGZvcj1cInRhZy1wcml2YXRlXCI+UHJpdmF0ZTwvbGFiZWw+PGJyIC8+XHJcbiAgPGJ1dHRvblxyXG4gICAgY2xhc3M9XCJvay1idXR0b25cIlxyXG4gICAgW2Rpc2FibGVkXT1cIiEoc2VsZWN0ZWRUYWdQdWJsaWMgfHwgc2VsZWN0ZWRUYWdQcml2YXRlKVwiXHJcbiAgICAoY2xpY2spPVwic3RvcmVUYWcoKVwiXHJcbiAgPlxyXG4gICAgT0tcclxuICA8L2J1dHRvbj5cclxuPC9kaXY+XHJcbiJdfQ==