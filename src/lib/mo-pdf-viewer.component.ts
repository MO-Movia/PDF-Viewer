import {
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFile,
  faUser,
  faMessage,
  faThumbsUp,
} from '@fortawesome/free-regular-svg-icons';
import {
  faSliders,
  faBookOpenReader,
  faQuoteRight,
  faArrowTrendUp,
  faTag,
  faTrash,
  faHighlighter,
} from '@fortawesome/free-solid-svg-icons';
import { PdfViewerComponent, PdfViewerModule } from 'ng2-pdf-viewer';
import { TextOptionsComponent } from './components/text-options/text-options.component';
import { CommentSelection } from './models/comment-selection.model';
import { SpanLocation } from './models/span-location.model';
import { HighlightSelection } from './models/highlight.model';
import { TagSelection } from './models/tag-selection.model';
import { HighlightPipe } from './pipes/highlight.pipe';
import { Nullable } from './types/types';
import { RIGHT_PANE_NAV } from './models/view.model';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    PdfViewerModule,
    FontAwesomeModule,
    FormsModule,
    AngularSplitModule,
    NgbNavModule,
    NgbTooltipModule,
  ],
  selector: 'mo-pdf-viewer',
  templateUrl: './mo-pdf-viewer.component.html',
  styleUrls: ['./mo-pdf-viewer.component.scss'],
})
export class MoPdfViewerComponent {
  @Input({ required: true }) public pdfSrc: string | Uint8Array = '';
  @Input() public documentTitle = '';
  @Input() public documentClassification = 'Unclassified';
  @Input() public documentAuthor = '';
  @Input() public minimalView = false;
  @ViewChild(PdfViewerComponent) public pdfComponent!: PdfViewerComponent;
  public currentSearchIndex: number = 1;
  public totalMatchesCount: number = 0;
  public I = {
    faFile,
    faUser,
    faSliders,
    faBookOpenReader,
    faMessage,
    faQuoteRight,
    faArrowTrendUp,
    faThumbsUp,
    faTag,
    faTrash,
    faHighlighter,
  };
  public searchText = '';
  public results = [
    {
      label: 'Source Name And Results',
    },
    {
      label: 'Source Name And Results',
    },
    {
      label: 'Source Name And Results',
    },
    {
      label: 'Source Name And Results',
    },
  ];
  public comments: CommentSelection[] = [];
  public spanCommentsMap = new Map<Element, Set<string>>();
  public highlights: HighlightSelection[] = [];
  public spanHighlightsMap = new Map<Element, Set<string>>();
  public tags: TagSelection[] = [];
  public spanTagMap = new Map<Element, Set<string>>();
  public searchCategories = [
    {
      label: 'Highlights',
      icon: faHighlighter,
    },
    {
      label: 'Tags',
      icon: faTag,
    },
    {
      label: 'Comments',
      icon: faMessage,
    },
  ];
  public navs = Object.values(RIGHT_PANE_NAV);
  @Input()
  public activeNav = this.navs[0];
  @Output()
  public closePane = new EventEmitter();
  @Output()
  public activeNavChange = new EventEmitter<string>();
  public selectedSearchCategory = 'Highlights';
  public page = 1;
  public highlightPipe = new HighlightPipe();
  public componentRefs: ComponentRef<TextOptionsComponent>[] = [];
  public dropdownVisible: { [key: string]: boolean } = {};
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly viewContainerRef: ViewContainerRef,
    public elementRef: ElementRef
  ) {}

  public afterLoadComplete(): void {
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams['page']) {
      this.page = queryParams['page'];
    }
  }

  public selectSearchCategory(category: string): void {
    this.selectedSearchCategory = category;
  }

  public onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchDown(this.searchText);
    } else {
      this.search(this.searchText);
    }
  }

  public search(stringToSearch: string): void {
    this.currentSearchIndex = 1;
    if (this.currentSearchIndex > 1) {
      this.currentSearchIndex--;
    }
    this.pdfComponent.eventBus.dispatch('find', {
      query: stringToSearch,
      type: 'again',
      caseSensitive: false,
      findPrevious: false,
      highlightAll: true,
      phraseSearch: true,
    });
    this.pdfComponent.eventBus.on('updatefindmatchescount',
      (event: {
        matchesCount: { current: number; total: number };
        currentSearchIndex: number;
      }) => {
        this.totalMatchesCount = event.matchesCount.total;
        const searchResultsDiv = document.getElementById('my-auto_count');
        if (searchResultsDiv) {
          searchResultsDiv.innerText = `${this.currentSearchIndex}/${this.totalMatchesCount}`;
        }
      });
  }

  public searchUp(stringToSearch: string): void {
    if (this.currentSearchIndex > 1) {
      this.currentSearchIndex--;
    } else if (this.currentSearchIndex === 1) {
      this.currentSearchIndex = this.totalMatchesCount;
    }
    this.updateSearch(stringToSearch, true);
    const searchResultsDiv = document.getElementById('my-auto_count');
    if (searchResultsDiv) {
      searchResultsDiv.innerText = `${this.currentSearchIndex}/${this.totalMatchesCount}`;
    }
  }

  public searchDown(stringToSearch: string): void {
    if (this.currentSearchIndex < this.totalMatchesCount) {
      this.currentSearchIndex++;
    } else if (this.currentSearchIndex === this.totalMatchesCount) {
      this.currentSearchIndex = 1;
    }
    this.updateSearch(stringToSearch, false);
    const searchResultsDiv = document.getElementById('my-auto_count');
    if (searchResultsDiv) {
      searchResultsDiv.innerText = `${this.currentSearchIndex}/${this.totalMatchesCount}`;
    }
  }

  public updateSearch(stringToSearch: string, findPrevious: boolean): void {
    this.pdfComponent.eventBus.dispatch('find', {
      query: stringToSearch,
      type: 'again',
      caseSensitive: false,
      findPrevious: findPrevious,
      highlightAll: true,
      phraseSearch: true,
    });
  }

  public submitComment(comment: CommentSelection,
    submitButton: HTMLButtonElement): void {
    comment.editMode = false;
    submitButton.setAttribute('disabled', 'true');
  }

  public enableSubmitButton(comment: CommentSelection,
    submitButton: HTMLButtonElement): void {
    const textAreaValue = comment.comment && comment.comment.trim().length > 0;
    if (submitButton) {
      if (textAreaValue) {
        submitButton.removeAttribute('disabled');
        submitButton.style.background = '#545050';
      } else {
        submitButton.setAttribute('disabled', 'true');
      }
    }
  }

  public editComment(comment: CommentSelection): void {
    comment.editMode = true;
  }

  public closeSource(): void {
    this.router.navigate(['sources']);
  }

  public showOptions(event: MouseEvent): void {
    if (
      event.composedPath().find((e) => {
        return this.componentRefs.find((e2) => e === e2.location.nativeElement);
      })
    ) {
      return;
    }
    this.deleteAllComponentRef();
    const target = event.target as Element;
    if (!this.minimalView) {
      const page = target.parentElement as HTMLElement;
      const left = event.clientX - page.getBoundingClientRect().left;
      const top = event.clientY - page.getBoundingClientRect().top;
      const dynamicComponent =
        this.viewContainerRef.createComponent(TextOptionsComponent);
      dynamicComponent.location.nativeElement.style.top = `${top}px`;
      dynamicComponent.location.nativeElement.style.left = `${left}px`;
      dynamicComponent.location.nativeElement.classList.add('position-absolute');
      target.parentElement?.parentElement?.insertAdjacentElement('beforeend',
        dynamicComponent.location.nativeElement);
      this.componentRefs.push(dynamicComponent);
      dynamicComponent.instance.highlightClicked.subscribe(this.setClassesForHighlights.bind(this));
      dynamicComponent.instance.tagClicked.subscribe(this.setClassesForTags.bind(this));
      dynamicComponent.instance.privateTagClicked.subscribe(this.setClassesForTags.bind(this));
      dynamicComponent.instance.commentClicked.subscribe(this.setClassesForComments.bind(this));
      dynamicComponent.instance.removeRequested.subscribe(this.deleteAllComponentRef.bind(this));
    }
  }

  public setClassesForComments(): void {
    const selection = window?.getSelection();
    if (!selection) {
      return;
    }
    const text = selection?.toString();
    const comment = {
      id: uuidv4(),
      spanLocations: [],
      comment: '',
      text,
      editMode: true,
    };
    this.setClassesForItem(
      comment,
      this.comments,
      'match-comment',
      this.spanCommentsMap,
      selection
    );
  }

  public setClassesForHighlights(): void {
    const selection = window?.getSelection();
    if (!selection) return;
    const text = selection?.toString();
    const highlight = {
      id: uuidv4(),
      spanLocations: [],
      text,
    };
    this.setClassesForItem(
      highlight,
      this.highlights,
      'match-highlight',
      this.spanHighlightsMap,
      selection
    );
  }

  public setClassesForTags(): void {
    const selection = window?.getSelection();
    if (!selection) return;

    const text = selection?.toString();
    const tagSelection = {
      id: uuidv4(),
      spanLocations: [],
      text,
      tags: [],
    };
    this.setClassesForItem(
      tagSelection,
      this.tags,
      'match-tag',
      this.spanTagMap,
      selection
    );
  }

  public deleteAllComponentRef(): void {
    this.componentRefs.forEach((ref) => {
      ref.destroy();
    });
    this.componentRefs = [];
  }

  public findRangeSections(selection: Selection): SpanLocation[] {
    const range = selection?.getRangeAt(0);
    const rangeClone = range?.cloneRange();
    let locations: SpanLocation[] = [];
    if (rangeClone) {
      const startLocation = this.getSpanLocation(rangeClone?.startContainer);
      const endLocation = this.getSpanLocation(rangeClone?.endContainer);
      locations = this.getInterveningLocations(startLocation, endLocation);
      if (locations.length > 0) {
        locations[0].startOffset = selection?.anchorOffset;
        locations[locations.length - 1].endOffset = selection?.focusOffset;
      }
    }
    return locations;
  }

  public getFirstPage(selection: {
    spanLocations: SpanLocation[];
  }): Nullable<number> {
    return selection.spanLocations.length > 0
      ? selection.spanLocations[0].pageNumber
      : null;
  }

  public getFirstSpan(selection: {
    spanLocations: SpanLocation[];
  }): Nullable<number> {
    return selection.spanLocations.length > 0
      ? selection.spanLocations[0].spanIndex
      : null;
  }

  public removeHighlight(highlight: HighlightSelection): void {
    const index = this.highlights.findIndex((c) => c.id === highlight.id);
    if (index > -1) {
      this.highlights.splice(index, 1);
    }
    this.removeSelection(
      highlight,
      'match-highlight',
      highlight.id,
      this.spanHighlightsMap
    );
  }

  public setClassesForItem(
    item: { id: string; spanLocations: SpanLocation[] },
    list: { id: string; spanLocations: SpanLocation[] }[],
    htmlClass: string,
    selectionMap: Map<Element, Set<string>>,
    selection: Selection
  ): void {
    const locations = this.findRangeSections(selection);
    if (locations.length < 1) {
      return;
    }
    item.spanLocations.push(...locations);
    list.push(item);
    for (const location of locations) {
      this.setSpanClassFromLocationMapped(
        location,
        htmlClass,
        item.id,
        selectionMap
      );
    }
    list.sort(this.sortSelection.bind(this));
  }

  public sortSelection(a: { spanLocations: SpanLocation[] },
    b: { spanLocations: SpanLocation[] }): number {
    const res = (this.getFirstPage(a) ?? 0) - (this.getFirstPage(b) ?? 0);
    if (res === 0) {
      return (this.getFirstSpan(a) ?? 0) - (this.getFirstSpan(b) ?? 0);
    }
    return res;
  }

  public removeComment(comment: CommentSelection): void {
    const index = this.comments.findIndex((c) => c.id === comment.id);
    if (index > -1) {
      this.comments.splice(index, 1);
    }
    this.removeSelection(
      comment,
      'match-comment',
      comment.id,
      this.spanCommentsMap
    );
  }

  public goToSelection(selection: { spanLocations: SpanLocation[] }): void {
    this.selectSelection(selection);
    if (selection.spanLocations.length > 0) {
      const span = this.getSpanFromLocation(selection.spanLocations[0]);
      if (span) {
        const scrollIntoViewOptions: ScrollIntoViewOptions = {
          block: 'center',
          inline: 'center',
        };
        span.scrollIntoView(scrollIntoViewOptions);
      }
    }
  }

  public selectSelection(selection: { spanLocations: SpanLocation[] }): void {
    document.querySelectorAll('span.match-active').forEach((s) => {
      s.classList.remove('match-active');
    });
    for (const location of selection.spanLocations) {
      this.setSpanClassFromLocation(location, 'match-active');
    }
  }

  public removeSelection(
    selection: { spanLocations: SpanLocation[] },
    htmlClass: string,
    selectionId: string,
    selectionMap: Map<Element, Set<string>>
  ): void {
    for (const location of selection.spanLocations) {
      this.removeSpanClassFromLocation(
        location,
        htmlClass,
        selectionId,
        selectionMap
      );
    }
  }

  public removeTag(tag: TagSelection): void {
    const index = this.tags.findIndex((c) => c.id === tag.id);
    if (index > -1) {
      this.tags.splice(index, 1);
    }
    this.removeSelection(
      tag, 'match-tag', tag.id, this.spanTagMap
    );
  }

  public getSpanFromLocation(location: SpanLocation): Nullable<Element> {
    const textLayer = this.getTextLayerFromLocation(location.pageNumber);
    if (textLayer && location.spanIndex > -1) {
      const spans = Array.from(textLayer?.querySelectorAll('span:not(.inner-span)'));
      return spans[location.spanIndex];
    }
    return null;
  }

  public setSpanClassFromLocationMapped(
    location: SpanLocation,
    htmlClass: string,
    selectionId: string,
    selectionMap: Map<Element, Set<string>>
  ): void {
    const textLayer = this.getTextLayerFromLocation(location.pageNumber);
    if (textLayer && location.spanIndex > -1) {
      const spans = Array.from(textLayer?.querySelectorAll('span:not(.inner-span)'));
      const span = spans[location.spanIndex];
      if (span) {
        let spanSet = selectionMap.get(span);
        if (!spanSet) {
          spanSet = new Set<string>();
          selectionMap.set(span, spanSet);
        }
        spanSet.add(selectionId);
      }
      span.classList.add(htmlClass);
    }
  }

  public setSpanClassFromLocation(location: SpanLocation,
    htmlClass: string): void {
    const textLayer = this.getTextLayerFromLocation(location.pageNumber);
    if (textLayer && location.spanIndex > -1) {
      const spans = Array.from(textLayer?.querySelectorAll('span:not(.inner-span)'));
      const span = spans[location.spanIndex] as HTMLElement;
      span.classList.add(htmlClass);
    }
  }

  public removeSpanClassFromLocation(
    location: SpanLocation,
    htmlClass: string,
    selectionId: string,
    selectionMap: Map<Element, Set<string>>
  ): void {
    const textLayer = this.getTextLayerFromLocation(location.pageNumber);
    if (textLayer && location.spanIndex > -1) {
      const spans = Array.from(textLayer?.querySelectorAll('span:not(.inner-span)'));
      const span = spans[location.spanIndex];
      const spanSet = selectionMap.get(span);
      if (spanSet) {
        spanSet.delete(selectionId);
        if (spanSet.size < 1) {
          span.classList.remove(htmlClass);
          document.querySelectorAll('span.match-active').forEach((s) => {
            s.classList.remove('match-active');
          });
          selectionMap.delete(span);
        }
      } else {
        span.classList.remove(htmlClass);
        document.querySelectorAll('span.match-active').forEach((s) => {
          s.classList.remove('match-active');
        });
      }
    }
  }

  public getSpanLocation(startContainer: Node): SpanLocation {
    const startPage = this.getPageParent(startContainer);
    const startSpan = this.getSpan(startContainer);
    const location: { pageNumber: number; spanIndex: number } = {
      pageNumber: -1,
      spanIndex: -1,
    };
    if (startPage && startSpan) {
      const startPageNumberAttr =
        startPage.attributes.getNamedItem('data-page-number');
      const pageNumber = startPageNumberAttr?.value;
      if (pageNumber) {
        location.pageNumber = +pageNumber;
      }
      const textLayer = startPage.querySelector('div.textLayer');
      if (textLayer) {
        const spans = Array.from(textLayer.querySelectorAll('span:not(.inner-span)'));
        const spanIndex = spans.findIndex((s) => s == startSpan);
        location.spanIndex = spanIndex;
      }
    }
    return location;
  }

  public getInterveningTextLayers(startPage: number,
    endPage: number): Element[] {
    const pages: Element[] = [];
    for (let p = startPage + 1; p < endPage; p++) {
      const page = this.getTextLayerFromLocation(p);
      if (page) {
        pages.push(page);
      }
    }
    return pages;
  }

  public getInterveningLocations(startLocation: SpanLocation,
    endLocation: SpanLocation): SpanLocation[] {
    const locations: SpanLocation[] = [];
    if (startLocation.pageNumber === endLocation.pageNumber) {
      if (startLocation.spanIndex === endLocation.spanIndex) {
        locations.push(startLocation);
      } else {
        locations.push(...this.getSamePageLocations(startLocation, endLocation));
      }
    } else {
      locations.push(...this.getAllNonSamePageLocations(startLocation, endLocation));
    }
    return locations;
  }

  public getAllNonSamePageLocations(startLocation: SpanLocation,
    endLocation: SpanLocation): SpanLocation[] {
    const locations: SpanLocation[] = [];
    locations.push(...this.getStartPageLocations(startLocation));
    if (startLocation.pageNumber && endLocation.pageNumber) {
      for (
        let p = startLocation.pageNumber + 1;
        p < endLocation.pageNumber;
        p++
      ) {
        locations.push(...this.getAllLocationsOnPage(p));
      }
    }
    locations.push(...this.getEndPageLocations(endLocation));
    return locations;
  }

  public getStartPageLocations(startLocation: SpanLocation): SpanLocation[] {
    const textLayer = this.getTextLayerFromLocation(startLocation.pageNumber);
    const locations: SpanLocation[] = [];
    if (textLayer && startLocation.spanIndex > -1 && startLocation.pageNumber) {
      const allSpans = Array.from(textLayer.querySelectorAll('span:not(.inner-span)'));
      for (let s = startLocation.spanIndex; s < allSpans.length; s++) {
        locations.push({
          pageNumber: startLocation.pageNumber,
          spanIndex: s,
        });
      }
    }
    return locations;
  }

  public getAllLocationsOnPage(pageNumber: number): SpanLocation[] {
    const textLayer = this.getTextLayerFromLocation(pageNumber);
    const locations: SpanLocation[] = [];
    if (textLayer) {
      const allSpans = Array.from(textLayer.querySelectorAll('span:not(.inner-span)'));
      for (let s = 0; s < allSpans.length; s++) {
        locations.push({
          pageNumber,
          spanIndex: s,
        });
      }
    }
    return locations;
  }

  public getEndPageLocations(endLocation: SpanLocation): SpanLocation[] {
    const locations: SpanLocation[] = [];
    if (endLocation.spanIndex > -1 && endLocation.pageNumber) {
      for (let s = 0; s <= endLocation.spanIndex; s++) {
        locations.push({
          pageNumber: endLocation.pageNumber,
          spanIndex: s,
        });
      }
    }
    return locations;
  }

  public getSamePageLocations(startLocation: SpanLocation,
    endLocation: SpanLocation): SpanLocation[] {
    const locations: SpanLocation[] = [];
    locations.push(startLocation);
    if (
      startLocation.spanIndex > -1 &&
      endLocation.spanIndex > -1 &&
      startLocation.pageNumber
    ) {
      for (
        let s = startLocation.spanIndex + 1;
        s < endLocation.spanIndex;
        s++
      ) {
        locations.push({
          pageNumber: startLocation.pageNumber,
          spanIndex: s,
        });
      }
    }
    locations.push(endLocation);
    return locations;
  }

  public getTextLayerFromLocation(pageNumber: number): Nullable<Element> | undefined {
    return this.pdfComponent.pdfViewerContainer.nativeElement
      .querySelector(`[data-page-number="${pageNumber}"]`)
      ?.querySelector('div.textLayer');
  }

  public getMiddlePages(startPage: HTMLElement | null,
    endPage: HTMLElement | null): HTMLElement[] {
    let siblingElement = startPage?.nextElementSibling as HTMLElement;
    const pages: HTMLElement[] = [];
    while (siblingElement && siblingElement !== endPage) {
      if (
        siblingElement.nodeName === 'DIV' &&
        siblingElement.classList.contains('page')
      ) {
        pages.push(siblingElement);
      }
      siblingElement = siblingElement.nextElementSibling as HTMLElement;
    }
    return pages;
  }

  public getPageParent(node: Node): Nullable<HTMLElement> {
    const parent = node.parentElement;
    if (!parent) {
      return null;
    } else if (parent.nodeName === 'DIV') {
      if (parent.classList.contains('page')) {
        return parent;
      } else {
        return this.getPageParent(parent);
      }
    } else {
      return this.getPageParent(parent);
    }
  }

  public getSpan(node: Node): Nullable<HTMLElement> {
    if (node.nodeName === '#text') {
      return node.parentElement;
    } else if (node.nodeName === 'SPAN') {
      return node as HTMLElement;
    } else {
      return null;
    }
  }

  public commntDropdownVisible(element: HTMLElement): void {
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    allDropdowns.forEach((dropdown) => {
      (dropdown as HTMLElement).style.display = 'none';
    });
    const parentSpan = element.closest('.icon-span');
    if (parentSpan) {
      const dropdownContent = parentSpan.querySelector('.dropdown-content') as HTMLElement;
      if (dropdownContent) {
        dropdownContent.style.display = 'block';
        const hideDropdown = (event: MouseEvent): void => {
          if (!parentSpan.contains(event.target as Node)) {
            dropdownContent.style.display = 'none';
            document.removeEventListener('click', hideDropdown);
          }
        };
        setTimeout(() => {
          document.addEventListener('click', hideDropdown);
        }, 0);
      }
    }
  }
}
