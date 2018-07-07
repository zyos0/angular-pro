import {FileSizePipe} from "./file-size.pipe";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";
import {Component} from "@angular/core";

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

describe('FileSizePipe', () => {

  describe('Shallow FileSizePipe test', () => {
    @Component({
      template: `
        Size: {{size | filesize:suffix}}
      `
    })
    class TestComponent {
      suffix;
      size = '123456789'
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          FileSizePipe,
          TestComponent
        ]
      });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });


    it('should convert bytes to megabytes', () => {
      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 117.74MB');
    });

    it('should use the default extension when not supplied', () => {
      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 117.74MB');
    });

    it('should use the default extension when supplied', () => {
      component.suffix='TNT';
      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 117.74TNT');
    });

  });

  describe('Isolate FileSizePipe test', () => {
    const pipe = new FileSizePipe();

    it('should convert bytes to megabytes', () => {
      expect(pipe.transform((123456789))).toBe('117.74MB');
      expect(pipe.transform((987654321))).toBe('941.90MB');
    });

    it('should use the default extension when not supplied', () => {
      expect(pipe.transform((123456789))).toBe('117.74MB');
      expect(pipe.transform((987654321))).toBe('941.90MB');
    });

    it('should use the default extension when supplied', () => {
      expect(pipe.transform(123456789, 'myExt')).toBe('117.74myExt');
      expect(pipe.transform(987654321, 'myExt')).toBe('941.90myExt');
    })
  })

});
