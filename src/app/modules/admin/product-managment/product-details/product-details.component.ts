import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, TreeNode } from 'primeng/api';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  providers: [MessageService],

})
export class ProductDetailsComponent {
  profileForm!: FormGroup;
  profileTree: TreeNode[] = [];
  router: any;
  id:string;

  breadcrumbItems = [
    { label: 'Product List', route: '/admin/productList' },
    { label: 'product Details' }  // No route for the current page
  ];
  constructor(private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private _profileService: ProductService,
  ) {
    this.id = this._activatedRoute.snapshot.queryParams['id'];

  }
  ngOnInit(): void {
    // this.buildProfileTree();
    this.getProfileDetails(this.id)
  }
getProfileDetails(profileId:string){
this._profileService.getProfileById(this.id).subscribe((response:any)=>{
  this.buildProfileTree(response)
})
}

  buildProfileTree(data: any): void {
    this.profileTree = [
        {
            key: '0',
            label: 'Profile Header',
            icon: 'fas fa-user',
            expanded: true,
            children: [
                {  label: 'Job Profile Name', data: { value: data.name || '' } },
                { label: 'Comment 1', data: { value: data.comment1 || '' } },
                { label: 'Comment 2', data: { value: data.comment2 || '' } },
                { label: 'Important Note', data: { value: data.importantNote || '' } },
                { label: 'Example', data: { value: data.example || '' } }
            ]
        },
        {
            label: 'Profile Questions',
            icon: 'fas fa-question',
            expanded: true,
            children: data.profileQuestions && data.profileQuestions.length > 0
                ? data.profileQuestions.map((question: any, index: number) => ({
                    label: `Question `,
                    expanded: false,
                    children: [
                        { label: 'Question', data: { value: question.question || '' } },
                        { label: 'Answer', data: { value: question.answer || '' } },
                        { label: 'Instruction', data: { value: question.instruction || '' } },
                        { label: 'Friendly Question', data: { value: question.friendlyQuestion || '' } }
                    ]
                }))
                : [{ label: 'No Questions Available', data: { value: '' } }] // Handle no questions scenario
        },
        {
            label: 'Profile Outputs',
            icon: 'fa-solid fa-info',
            expanded: false,
            children: data.profileOutputs && data.profileOutputs.length > 0
                ? data.profileOutputs.map((output: any, index: number) => ({
                    label: `Name`,
                    data: { value: output.name || '' }
                }))
                : [{ label: 'No Outputs Available', data: { value: '' } }] // Handle no outputs scenario
        }
    ];
}

  // buildProfileTree(): void {
  //   this.profileTree = [
  //     {
  //       key: '0',
  //       label: 'Profile Header',
  //       icon: 'fas fa-user',
  //       expanded: true,
  //       children: [
  //         { key: '0-0', label: 'Job Profile Name', data: { value: 'Senior Developer' } },
  //         { label: 'Comment 1', data: { value: 'This is the first comment.' } },
  //         { label: 'Comment 2', data: { value: 'This is the second comment.' } },
  //         { label: 'Important Note', data: { value: 'Ensure all fields are accurate.' } },
  //         { label: 'Example', data: { value: 'Example content here.' } }
  //       ]
  //     },
  //     {
  //       label: 'Profile Questions',
  //       icon: 'fas fa-question',
  //       expanded: true,
  //       children: [
  //         {
  //           label: 'Question 1',
  //           expanded: true,
  //           children: [
  //             { label: 'Question', data: { value: 'What is your skill set?' } },
  //             { label: 'Answer', data: { value: 'JavaScript, Angular' } },
  //             { label: 'Instruction', data: { value: 'Provide all relevant skills.' } },
  //             { label: 'Friendly Question', data: { value: 'What programming languages do you know?' } }
  //           ]
  //         },
  //         {
  //           label: 'Question 2',
  //           expanded: true,
  //           children: [
  //             { label: 'Question', data: { value: 'What is your skill set?' } },
  //             { label: 'Answer', data: { value: 'JavaScript, Angular' } },
  //             { label: 'Instruction', data: { value: 'Provide all relevant skills.' } },
  //             { label: 'Friendly Question', data: { value: 'What programming languages do you know?' } }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       label: 'Profile Outputs',
  //       icon:'fa-solid fa-info',
  //       expanded: true,
  //       children: [
  //         { label: 'Output Name', data: { value: 'Technical Output Name' } }
  //       ]
  //     }
  //   ];
  // }
  
  goBack(): void {
    this.router.navigate(['/admin/profileList']);  // Navigate to profile list page
  }
}
