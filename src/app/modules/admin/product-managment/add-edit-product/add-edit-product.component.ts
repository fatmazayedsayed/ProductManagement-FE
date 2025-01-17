import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, TreeNode } from 'primeng/api';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
  providers: [MessageService],
})
export class AddEditProductComponent {
  profileForm!: FormGroup;
  myForm!: FormGroup;
  breadcrumbItems = [
    { label: 'Profiles List', route: '/admin/productList' },
    { label: ' Add  New Product' },
  ];
  profileId!: string;
  profileDetails: any;
  isSubmitted: boolean = false;
  showoutPutErrMsg: boolean = false;
  showQuesMsg: boolean = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.profileId = params.id;
    });
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      // id: ['', Validators.required],
      name: ['', Validators.required],
      importantNote: ['', Validators.required],
      comment1: ['', Validators.required],
      comment2: ['', Validators.required],
      example: ['', Validators.required],
      questions: this.fb.array([this.initQuestion()]),
      outputs: this.fb.array([this.initOutput()]),
    });
    if (this.profileId) {
      this.getProfileData();
    } else {
      return;
    }

    this.breadcrumbItems = [
      { label: 'Profiles List', route: '/admin/profileList' },
      { label: this.profileId ? 'Update Profile ' : 'Add New Profile' },
    ];
  }

  initQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
      instruction: ['', Validators.required],
      friendlyQuestion: ['', Validators.required],
    });
  }

  initOutput(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
    });
  }

  addQuestion(): void {
    (this.myForm.get('questions') as FormArray).push(this.initQuestion());
    this.showQuesMsg = false;
  }

  addOutput(): void {
    (this.myForm.get('outputs') as FormArray).push(this.initOutput());
    this.showoutPutErrMsg = false;
  }
  questionsArray: any;
  removeQuestion(index: number): void {
    this.questionsArray = this.myForm.get('questions') as FormArray;
    this.questionsArray.removeAt(index);
    if (this.questionsArray.length == 0) {
      this.showQuesMsg = true;
    } else {
      this.showQuesMsg = false;
    }
  }
  outputsArray: any;
  removeOutput(index: number): void {
    this.outputsArray = this.myForm.get('outputs') as FormArray;

    this.outputsArray.removeAt(index);
    if (this.outputsArray.length == 0) {
      this.showoutPutErrMsg = true;
    } else {
      this.showoutPutErrMsg = false;
    }
  }

  get questions(): FormArray {
    return this.myForm.get('questions') as FormArray;
  }
  get outputs(): FormArray {
    return this.myForm.get('outputs') as FormArray;
  }

  getProfileData() {
    this.profileService.getProfileById(this.profileId).subscribe((res: any) => {
      this.profileDetails = res;

      this.updateFormWithData();
    });
  }
  updateFormWithData() {
    this.myForm.patchValue({
      name: this.profileDetails?.name,
      importantNote: this.profileDetails?.importantNote,
      comment1: this.profileDetails?.comment1,
      comment2: this.profileDetails?.comment2,
      example: this.profileDetails?.example,
    });

    this.clearFormArray(this.questions);
    this.clearFormArray(this.outputs);

    if (
      this.profileDetails.profileQuestions &&
      this.profileDetails.profileQuestions.length
    ) {
      this.profileDetails.profileQuestions.forEach((question: any) => {
        const questionGroup = this.fb.group({
          question: [question.question, Validators.required],
          answer: [question.answer, Validators.required],
          instruction: [question.instruction, Validators.required],
          friendlyQuestion: [question.friendlyQuestion, Validators.required],
        });
        this.questions.push(questionGroup);
      });
    }

    if (
      this.profileDetails.profileOutputs &&
      this.profileDetails.profileOutputs.length
    ) {
      this.profileDetails.profileOutputs.forEach((output: any) => {
        const outputGroup = this.fb.group({
          name: [output.name, Validators.required],
        });
        this.outputs.push(outputGroup);
      });
    }
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  onSubmit(): void {
    this.myForm.markAllAsTouched();

    this.isSubmitted = true;
    if (this.outputsArray?.length === 0) {
      this.showoutPutErrMsg = true;
    } else {
      this.showoutPutErrMsg = false;
      this.showoutPutErrMsg = false;
    }
    if (this.questionsArray?.length === 0) {
      this.showQuesMsg = true;
    } else {
      this.showQuesMsg = false;
      this.showQuesMsg = false;
    }

    console.log(this.myForm.status);
    if (this.myForm.valid && !this.showoutPutErrMsg && !this.showQuesMsg) {
      const postData = this.myForm.value;
      let updateData = {
        id: this.profileId,
        ...this.myForm.value,
      };
      if (!this.profileId) {
        this.profileService.addProfile(postData).subscribe(
          (res: any) => {
            if (res == true) {
              this.messageService.add({
                key: 'toast1',
                severity: 'success',
                summary: 'Success',
                detail: 'Profile Added Successfully',
              });
              setTimeout(() => {
                this.router.navigate(['/admin/profileList']);
              }, 500);
            }
          },
          (err: any) => {
            if (err) {
              this.messageService.add({
                key: 'toast2',
                severity: 'error',
                summary: 'Error',
                detail: 'Error In Adding Profile',
              });
            }
          }
        );
      } else {
        this.profileService.editProfile(updateData).subscribe(
          (res: any) => {
            if (res == true) {
              this.messageService.add({
                key: 'toast1',
                severity: 'success',
                summary: 'Success',
                detail: 'Profile Updated Successfully',
              });
              setTimeout(() => {
                this.router.navigate(['/admin/profileList']);
              }, 500);
            }
          },
          (err: any) => {
            if (err) {
              this.messageService.add({
                key: 'toast2',
                severity: 'error',
                summary: 'Error',
                detail: 'Error In Updating Profile',
              });
            }
          }
        );
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
