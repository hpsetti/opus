import { createRouter, createWebHistory } from 'vue-router'

/**
 * README
 * 1. Do not name the parent component if there is a default child route
 * (i.e. path: '' or path: '/') defined
 * 2. There shouldn't be two routes with same 'name'
 * 3. Merge all logically and frequently used components under a single
 * webpackChunkName
 * 4. webpack generates chunks based on the comments in import statements.
 * DO NOT MODIFY THEM.
 * 5. No need to specify meta property for every route
 *
 * TODO
 * 1. Keep meta property for routes only where needed
 * 2. Remove unused routes i.e. SubmissionBuilder, ResourceLibrary
 * and some routes in LaunchPad e.g. addConsultant
 */


/* eslint-disable implicit-arrow-linebreak */
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'landinglayout',
      component: () =>
        import(
          /* webpackChunkName: "login-layout" */ '@/components/LandingLayout/Layout.vue'
        ),
      children: [
        {
          path: 'login',
          component: () =>
            import(/* webpackChunkName: "login" */ '@/components/Login/Login.vue'),
          name: 'login',
          meta: {
            title: 'Login'
          }
        },
        {
          path: 'confirmlogin/:token',
          component: () =>
            import(
              /* webpackChunkName: "register" */ '@/components/Login/ConfirmLogin.vue'
            ),
          name: 'confirmlogin',
          meta: {
            title: 'Confirm Login'
          }
        },
        {
          path: '/register',
          component: () =>
            import(
              /* webpackChunkName: "register" */ '@/components/Register/Register.vue'
            ),
          name: 'register',
          meta: {
            title: 'Register'
          }
        },
        {
          path: 'register/compliancewire',
          component: () =>
            import(
              /* webpackChunkName: "register" */ '@/components/Register/Register.vue'
            ),
          name: 'compliance wire',
          props: true,
          meta: {
            title: 'ComplianceWire®'
          }
        },
        {
          path: '/forgot',
          component: () =>
            import(
              /* webpackChunkName: "register" */ '@/components/Password/ForgotPassword.vue'
            ),
          name: 'forgot',
          props: true,
          meta: {
            title: 'Forgot Password'
          }
        },

        {
          path: 'reset/:token',
          component: () =>
            import(
              /* webpackChunkName: "register" */ '@/components/Password/ResetPassword.vue'
            ),
          name: 'confirmreset',
          props: true,
          meta: {
            title: 'Reset Password'
          }
        },
        {
          path: 'confirmregister/:token',
          component: () =>
            import(
              /* webpackChunkName: "register" */ '@/components/Register/ConfirmRegister.vue'
            ),
          name: 'confirmregister',
          props: true,
          meta: {
            title: 'Confirm Register'
          }
        },
        {
          path: '/terms-of-service',
          component: () =>
            import(
              /* webpackChunkName: "register" */ '@/components/TermsOfService/TermsOfService.vue'
            ),
          name: 'termsofservice',
          props: true,
          meta: {
            title: 'Terms Of Service'
          }
        }
      ]
    },
    {
      path: '/',
      component: () =>
        import(/* webpackChunkName: "dashboard" */ '@/components/Layout/Layout.vue'),
      redirect: '/home',
      meta: {
        title: 'Dashboard'
      },
      children: [
        {
          path: 'home',
          name: 'Dashboard',
          component: () =>
            import(
              /* webpackChunkName: "dashboard" */ '@/components/Dashboard/Dashboard.vue'
            ),
          props: true,
          meta: {
            title: 'Dashboard'
          }
        },
        {
          path: '/home/demovideo',
          name: 'Demo',
          component: () =>
            import(
              /* webpackChunkName: "dashboard" */ '@/components/Dashboard/Dashboard.vue'
            ),
          props: true
        },
        {
          path: '/compliancewire-marketplace',
          name: 'compliancewire',
          component: () =>
            import(
              /* webpackChunkName: "dashboard" */ '@/components/ComplianceWire/ComplianceWireHome.vue'
            ),
          props: true,
          meta: {
            title: 'ComplianceWire®'
          }
        },
        {
          path: '/compliancewire-marketplace/details/:id',
          name: 'compliancewire',
          component: () =>
            import(
              /* webpackChunkName: "dashboard" */ '@/components/ComplianceWire/ComplianceWireDetails.vue'
            ),
          props: true,
          meta: {
            title: 'ComplianceWire®'
          }
        },
        {
          path: '/market-place',
          component: () =>
            import(
              /* webpackChunkName: "marketplace" */ '@/components/NewMarketPlace/MarketPlaceWrapper.vue'
            ),
          props: true,
          children: [
            {
              path: '',
              name: 'MarketPlace',
              component: () =>
                import(
                  /* webpackChunkName: "marketplace" */ '@/components/NewMarketPlace/MarketPlaceHome.vue'
                ),
              props: true,
              meta: {
                title: 'Marketplace'
              }
            },
            {
              path: 'documents/:documentId',
              name: 'DocumentPreview',
              component: () =>
                import(
                  /* webpackChunkName: "marketplace" */ '@/components/UIComponents/DocumentPreview.vue'
                ),
              props: true,
              meta: {
                title: 'Marketplace'
              }
            },
            {
              path: 'cart',
              name: 'Cart',
              component: () =>
                import(
                  /* webpackChunkName: "marketplace" */ '@/components/NewMarketPlace/Cart/Cart.vue'
                ),
              props: true,
              meta: {
                title: 'Marketplace'
              }
            },
            {
              path: ':name',
              name: 'Resources',
              component: () =>
                import(
                  /* webpackChunkName: "marketplace" */ '@/components/NewMarketPlace/Resources.vue'
                ),
              props: true,
              meta: {
                title: 'Marketplace'
              }
            }
          ]
        },
        {
          path: '/notifications',
          name: 'notification',
          component: () =>
            import(
              /* webpackChunkName: "notification" */ '@/components/Notification/Notification.vue'
            ),
          props: true,
          meta: {
            title: 'Notifications'
          }
        },
        {
          path: 'known-problem-analysis-wizard',
          name: 'KnownProblemAnalysisWizard',
          component: () =>
            import(
              /* webpackChunkName: "tools-touch-target" */ '@/components/KnownProblemAnalysisWizard/KnownProblemAnalysisWizardTool.vue'
            ),
          props: true,
          meta: {
            title: 'Known Problem Analysis Wizard'
          }
        },
        {
          path: '/release-notes',
          name: 'ReleaseNotes',
          props: true,
          component: () =>
            import(
              /* webpackChunkName: "release" */ '@/components/About/ReleaseNotesHome.vue'
            ),
          meta: {
            title: 'Help & Support'
          }
        },
        {
          path: '/documents',
          component: () =>
            import(
              /* webpackChunkName: "documents" */ '@/components/NewDocuments/DocumentsWrapper.vue'
            ),
          props: true,
          children: [
            {
              path: '',
              component: () =>
                import(
                  /* webpackChunkName: "documents" */ '@/components/NewDocuments/DocumentsHomePage.vue'
                ),
              props: true,
              meta: {
                title: 'Documents'
              }
            },
            {
              path: ':documentId',
              name: 'Document',
              component: () =>
                import(
                  /* webpackChunkName: "documents" */ '@/components/UIComponents/DocumentPreview.vue'
                ),
              props: true,
              meta: {
                title: 'Documents'
              }
            }
          ]
        },
        /* {
          path: '/submission-builder',
          component: SubmissionBuilder,
          name: 'SubmissionBuilder',
          meta: {
            title: 'Smart Builder',
          },
        }, */
        {
          path: '/projectplans',
          component: () =>
            import(
              /* webpackChunkName: "projectplan" */ '@/components/ProjectPlan/ProjectPlanWrapper.vue'
            ),
          props: true,
          meta: {
            title: 'Project Plans'
          },
          children: [
            {
              path: '',
              name: 'ProjectPlans',
              component: () =>
                import(
                  /* webpackChunkName: "projectplan" */ '@/components/ProjectPlan/ProjectPlan.vue'
                ),
              meta: {
                title: 'Project Plans'
              }
            },
            {
              path: ':id',
              name: 'projectDetails',
              component: () =>
                import(
                  /* webpackChunkName: "projectplan" */ '@/components/ProjectPlan/ProjectPlan.vue'
                ),
              props: true,
              meta: {
                title: 'Project Plans'
              }
            },
            {
              path: ':id/:path',
              name: 'subProjectDetails',
              component: () =>
                import(
                  /* webpackChunkName: "projectplan" */ '@/components/ProjectPlan/ProjectPlan.vue'
                ),
              props: true,
              meta: {
                title: 'Project Plans'
              }
            },
          ]
        },
        {
          path: '/trainings',
          component: () =>
            import(/* webpackChunkName: "trainings" */ '@/components/Training/index.vue'),
          meta: {
            title: 'Training'
          },
          children: [
            {
              path: '',
              name: 'Training',
              component: () =>
                import(
                  /* webpackChunkName: "trainings" */ '@/components/Training/Training.vue'
                ),
              meta: {
                title: 'Training'
              }
            },
            {
              path: 'schedule-training/:name',
              name: 'ScheduleTraining',
              component: () =>
                import(
                  /* webpackChunkName: "trainings" */ '@/components/Training/ScheduleTraining.vue'
                ),
              meta: {
                title: 'Training'
              }
            }
          ]
        },
        {
          path: '/opusprocess',
          name: 'OpusProcess',
          component: () =>
            import(
              /* webpackChunkName: "projects" */ '@/components/ProjectPlan/ProjectPlan.vue'
            ),
          props: true,
          meta: {
            title: 'HFE Process'
          }
        },
        {
          path: '/contact',
          name: 'ContactUs',
          component: () =>
            import(
              /* webpackChunkName: "contact" */ '@/components/AboutNContact/ContactUs.vue'
            ),
          props: true,
          meta: {
            title: 'Contact Us'
          }
        },
        {
          path: '/launchpad',
          component: () =>
            import(/* webpackChunkName: "admin" */ '@/components/LaunchPad/LaunchPad.vue'),
          meta: {
            title: 'Launch Pad'
          },
          children: [
            {
              path: '',
              name: 'LaunchPadDashboard',
              component: () =>
                import(
                  /* webpackChunkName: "admin" */ '@/components/LaunchPad/Dashboard.vue'
                ),
              props: true,
              meta: {
                title: 'Launch Pad'
              }
            },
            {
              path: 'activate-service',
              name: 'Activate Service',
              component: () =>
                import(
                  /* webpackChunkName: "admin" */ '@/components/LaunchPad/ActivateService.vue'
                ),
              props: true,
              meta: {
                title: 'Launch Pad'
              }
            },
            {
              path: 'hfe-insights',
              name: 'HFE Insights',
              component: () =>
                import(
                  /* webpackChunkName: "admin" */ '@/components/LaunchPad/Insights/HfeInsightsHome.vue'
                ),
              props: true,
              meta: {
                title: 'Launch Pad'
              }
            },
            {
              path: 'revoke-service',
              name: 'Revoke Service',
              component: () =>
                import(
                  /* webpackChunkName: "admin" */ '@/components/LaunchPad/RevokeService.vue'
                ),
              props: true,
              meta: {
                title: 'Launch Pad'
              }
            },
            {
              path: 'consulting-hours',
              component: () =>
                import(
                  /* webpackChunkName: "admin-consulting" */ '@/components/LaunchPad/consulting/ConsultingWrapper.vue'
                ),
              props: true,
              meta: {
                title: 'Launch Pad'
              },
              children: [
                {
                  path: '',
                  name: 'Consulting Hours',
                  component: () =>
                    import(
                      /* webpackChunkName: "admin-consulting" */ '@/components/LaunchPad/consulting/consulting.vue'
                    ),
                  props: true,
                  meta: {
                    title: 'Launch Pad'
                  }
                },
                {
                  path: 'projects/:type',
                  component: () =>
                    import(
                      /* webpackChunkName: "admin-consulting" */ '@/components/LaunchPad/consulting/ConsultingProjectsWrapper.vue'
                    ),
                  props: true,
                  meta: {
                    title: 'Launch Pad'
                  },
                  children: [
                    {
                      path: '',
                      name: 'Consulting Projects',
                      component: () =>
                        import(
                          /* webpackChunkName: "admin-consulting" */ '@/components/LaunchPad/consulting/ConsultingProjects.vue'
                        ),
                      props: true,
                      meta: {
                        title: 'Launch Pad'
                      }
                    },
                    {
                      path: 'view/:id',
                      name: 'View Project',
                      component: () =>
                        import(
                          /* webpackChunkName: "admin-consulting" */ '@/components/LaunchPad/consulting/ViewProject.vue'
                        ),
                      props: true,
                      meta: {
                        title: 'Launch Pad'
                      }
                    },
                    {
                      path: 'edit/:id',
                      name: 'Edit Project',
                      component: () =>
                        import(
                          /* webpackChunkName: "admin-consulting" */ '@/components/LaunchPad/consulting/EditProject.vue'
                        ),
                      props: true,
                      meta: {
                        title: 'Launch Pad'
                      }
                    }
                  ]
                }
              ]
            },
            {
              path: 'AdminCertificateList',
              name: 'AdminCertificateList',
              component: () =>
                import(
                  /* webpackChunkName: "admin" */ '@/components/LaunchPad/AdminCertificateList.vue'
                ),
              meta: {
                title: 'Admin Certificate List'
              }
            },
            {
              path: 'ReferralOffer',
              name: 'ReferralOffer',
              component: () =>
                import(
                  /* webpackChunkName: "admin" */ '@/components/LaunchPad/Referral/ReferralOffer.vue'
                ),
              meta: {
                title: 'Referral Offer'
              }
            },
            {
              path: 'users',
              component: () =>
                import(/* webpackChunkName: "admin" */ '@/components/LaunchPad/Users.vue'),
              name: 'Users',
              meta: {
                title: 'Users'
              }
            },
            {
              path: 'manage-docs',
              component: () =>
                import(
                  /* webpackChunkName: "admin" */ '@/components/LaunchPad/Documents/ManageDocumentsHome.vue'
                ),
              name: 'ManageDocuments',
              meta: {
                title: 'Manage Documents'
              }
            },
            {
              path: 'timeslots',
              name: 'TimeSlots',
              component: () =>
                import(
                  /* webpackChunkName: "admin" */ '@/components/TimeSlots/TimeSlots.vue'
                ),
              props: true,
              meta: {
                title: 'Time Slots'
              }
            },
            {
              path: 'RCA-admin-home',
              name: 'AdminRCAHome',
              component: () =>
                import(
                  /* webpackChunkName: "admin" */ '@/components/LaunchPad/RootCauseAnalysis/AdminRCAHome.vue'
                ),
              meta: {
                title: 'RCA Dashboard'
              }
            },
            {
              path: 'drl-admin-home',
              name: 'AdminDRLHome',
              component: () =>
                import(
                  /* webpackChunkName: "admin" */ '@/components/LaunchPad/DRL/AdminDRLHome.vue'
                ),
              meta: {
                title: 'DRL Dashboard'
              }
            },
            {
              path: 'uirl-admin-home',
              name: 'AdminUIRLHome',
              component: () =>
                import(
                  /* webpackChunkName: "admin" */ '@/components/LaunchPad/UIRL/AdminUIRLHome.vue'
                ),
              meta: {
                title: 'UIRL Dashboard'
              }
            },
            {
              path: 'email-blocking',
              name: 'AdminEmailBlock',
              component: () =>
                import(
                  /* webpackChunkName: "admin" */ '@/components/LaunchPad/EmailBlocking/AdminEmailBlock.vue'
                ),
              meta: {
                title: 'Block Email Domains'
              }
            },
            {
              path: 'AccountDetails',
              name: 'AccountDetails',
              component: () =>
                import(
                  /* webpackChunkName: "admin" */ '@/components/LaunchPad/AccountDetails.vue'
                ),
              meta: {
                title: 'Account details'
              }
            }
          ]
        },
        {
          path: '/PermissionAccess',
          name: 'PermissionsAccess',
          component: () =>
            import(
              /* webpackChunkName: "permissions" */ '@/components/Common/PermissionAccess.vue'
            ),
          props: true,
          meta: {
            title: 'Permission Access'
          }
        },
        {
          path: '/tools',
          component: () =>
            import(/* webpackChunkName: "tools-home" */ '@/components/Tools/index.vue'),
          props: true,
          meta: {
            title: 'Tools'
          },
          children: [
            {
              path: '',
              name: 'Tools',
              component: () =>
                import(
                  /* webpackChunkName: "tools-home" */ '@/components/Tools/Tools.vue'
                ),
              props: true,
              meta: {
                title: 'Tools'
              }
            },
            {
              path: 'hf-validation-test-calculator',
              name: 'Validate',
              component: () =>
                import(
                  /* webpackChunkName: "tools-hf-validation" */ '@/components/ProjectPlan/Validate/Validate.vue'
                ),
              props: true,
              meta: {
                title: 'Tools'
              }
            },
            {
              path: 'text-legibility',
              name: 'Text Legibility',
              component: () =>
                import(
                  /* webpackChunkName: "tools-text-legibility" */ '@/components/TextLegibility/TextLegibility.vue'
                ),
              props: true,
              meta: {
                title: 'Tools'
              }
            },
            {
              path: 'hfe-project-scope',
              name: 'hfe-project-scope',
              component: () =>
                import(
                  /* webpackChunkName: "tools-hfe-project-scope" */ '@/components/ScopeTool/ScopeTool.vue'
                ),
              props: true,
              meta: {
                title: 'Tools'
              }
            },
            {
              path: 'hfe-project-scope/preview',
              name: 'ScopeToolPDFViewer',
              component: () =>
                import(
                  /* webpackChunkName: "tools-hfe-project-scope-preview" */ '@/components/ScopeTool/ScopeToolPDFViewer.vue'
                ),
              props: true,
              meta: {
                title: 'View Plan'
              }
            },
            {
              path: 'root-cause-analysis-wizard',
              name: 'Root Cause Analysis',
              component: () =>
                import(
                  /* webpackChunkName: "tools-rca" */ '@/components/Tools/RootCauseAnalysis/RootCauseAnalysisHome.vue'
                ),
              props: true,
              meta: {
                title: 'Tools'
              }
            },
            {
              path: 'root-cause-analysis-wizard/preview/:id',
              name: 'RootCausePdfViewer',
              component: () =>
                import(
                  /* webpackChunkName: "tools-rca-preview" */ '@/components/Tools/RootCauseAnalysis/RootCausePdfViewer.vue'
                ),
              props: true,
              meta: {
                title: 'Root Cause Analysis (RCA) Wizard'
              }
            },
            {
              path: 'touch-target-tool',
              name: 'TouchTargetTool',
              component: () =>
                import(
                  /* webpackChunkName: "tools-touch-target" */ '@/components/TouchTargetTool/TouchTargetTool.vue'
                ),
              props: true,
              meta: {
                title: 'Tools'
              }
            },
            {
              path: 'use-error-wizard',
              name: 'UseErrorWizard',
              component: () =>
                import(
                  /* webpackChunkName: "tools-touch-target" */ '@/components/UseErrorWizard/UseErrorWizardIndex.vue'
                ),
              props: true,
              meta: {
                title: 'Tools'
              }
            },
            {
              path: 'known-problem-analysis',
              name: 'Known Problem Analysis',
              component: () =>
                import(
                  '@/components/KnownProblemAnalysisWizard/KnownProblemAnalysisWizardTool.vue'
                ),
              props: true,
              meta: {
                title: 'Known Problem Analysis'
              }
            },
            {
              path: 'mdus',
              name: 'MDUS',
              component: () =>
                import(
                  /* webpackChunkName: "tools-mdus" */ '@/components/Tools/MDUS/MDUS.vue'
                ),
              props: true,
              meta: {
                title: 'Tools'
              }
            },
            {
              path: 'safety-label-quick-guide',
              name: 'Warning Design Guide',
              component: () =>
                import(
                  /* webpackChunkName: "tools-warning-design" */ '@/components/Tools/WarningDesignGuide/warningDesignHome.vue'
                ),
              props: true,
              meta: {
                title: 'Tools'
              }
            },
            {
              path: 'inclusive-design-guide',
              name: 'Inclusive Design Guide',
              component: () =>
                import(
                  /* webpackChunkName: "inclusive-design-guide" */ '@/components/Tools/InclusiveDesignGuide/inclusiveDesignHome.vue'
                ),
              props: true,
              meta: {
                title: 'Tools'
              }
            },
            {
              path: 'design-recommendation-library',
              component: () =>
                import(
                  /* webpackChunkName: "tools-drl" */ '@/components/Tools/DesignRecommendation/DesignRecommendationWrapper.vue'
                ),
              props: true,
              meta: {
                title: 'Tools'
              },
              children: [
                {
                  path: '',
                  name: 'Design Recommendation Library',
                  component: () =>
                    import(
                      /* webpackChunkName: "tools-drl" */ '@/components/Tools/DesignRecommendation/DesignRecommendationHome.vue'
                    ),
                  meta: {
                    title: 'Tools'
                  }
                },
                {
                  path: 'library',
                  name: 'DesignRecommendationContent',
                  component: () =>
                    import(
                      /* webpackChunkName: "tools-drl" */ '@/components/Tools/DesignRecommendation/DesignRecommendationContent.vue'
                    ),
                  meta: {
                    title: 'Tools'
                  }
                }
              ]
            },
            {
              path: 'user-interface-requirements-library',
              component: () =>
                import(
                  /* webpackChunkName: "tools-uirl" */ '@/components/Tools/UserInterfaceRequirementLibrary/UserInterfaceRequirementLibraryWrapper.vue'
                ),
              props: true,
              meta: {
                title: 'Tools'
              },
              children: [
                {
                  path: '',
                  name: 'User Interface Requirement Library',
                  component: () =>
                    import(
                      /* webpackChunkName: "tools-uirl" */ '@/components/Tools/UserInterfaceRequirementLibrary/UserInterfaceRequirementLibraryHome.vue'
                    ),
                  meta: {
                    title: 'Tools'
                  }
                },
                {
                  path: 'library',
                  name: 'UserInterfaceRequirementLibraryContent',
                  component: () =>
                    import(
                      /* webpackChunkName: "tools-drl" */ '@/components/Tools/UserInterfaceRequirementLibrary/UserInterfaceRequirementLibraryContent.vue'
                    ),
                  meta: {
                    title: 'Tools'
                  }
                }
              ]
            }
          ]
        },
        {
          path: 'consulting',
          name: 'ConsultingHome',
          component: () =>
            import(
              /* webpackChunkName: "consulting" */ '@/components/Consulting/ConsultingHome.vue'
            ),
          props: true,
          meta: {
            title: 'Consulting'
          }
        },
        {
          path: 'schedule-consulting/:name',
          name: 'ScheduleConsulting',
          component: () =>
            import(
              /* webpackChunkName: "consulting" */ '@/components/Consulting/ScheduleConsulting.vue'
            ),
          props: true,
          meta: {
            title: 'Consulting'
          }
        },
        {
          path: 'insights/:id',
          name: 'HFEInsight',
          component: () =>
            import(
              /* webpackChunkName: "hfeinsight" */ '@/components/Dashboard/HFEInsight.vue'
            ),
          props: true,
          meta: {
            title: 'HFE Insights'
          }
        },
        {
          path: 'styleguide',
          name: 'StyleGuide',
          component: () =>
            import(/* webpackChunkName: "styleguide" */ '@/StyleGuide.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
});

export default router;