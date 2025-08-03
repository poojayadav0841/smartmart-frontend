import { Directive, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileHandle } from '../app/_model/file-handle.model';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @Output() files: EventEmitter<FileHandle> = new EventEmitter<FileHandle>();

  @HostBinding("style.background") private backgroundColor = "#eee";

  constructor(private sanitizer: DomSanitizer) {}

  @HostListener("dragover", ["$event"])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.backgroundColor = "#999";
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.backgroundColor = "#eee";
  }

  @HostListener("drop", ["$event"])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.backgroundColor = "#eee";

    let fileHandle: FileHandle | null = null;

    const file = evt.dataTransfer?.files[0];
    if (file) {
      const url: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      );
      fileHandle = { file, url };
      this.files.emit(fileHandle);
    }
  }
}
