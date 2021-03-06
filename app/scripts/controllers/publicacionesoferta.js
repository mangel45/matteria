﻿'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('OfertasCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$stateParams', '$window', 'focus', function ($scope, API_PATH_MEDIA, contenidoFactory, $stateParams, $window, focus) {

      $scope.professions = [];
      $scope.tempProfesiones = [];
      $scope.tempIntereses = [];
      $scope.vacante = [{}];
      $scope.oferta = [{}];
      $scope.servicios = [{}];
      $scope.oferta.keep_company_alias = false;
      $scope.oferta.private_salary = false;
      $scope.IsCiudad = true;
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;
      $scope.textarea = "";

      //Tipo de vacantes
      contenidoFactory.ServiceContenido('catalogs/opening-services/?format=json', 'GET', '{}').then(function (data) {
          $scope.tipovacante = data.data
      });

      //Pais
      contenidoFactory.ServiceContenido('catalogs/countries/?format=json', 'GET', '{}').then(function (data) {
          $scope.paises = data.data;

      });

      //Divisas
      contenidoFactory.ServiceContenido('catalogs/currencies/?format=json', 'GET', '{}').then(function (data) {
          $scope.divisas = data.data;

      });

      $scope.selectEstado = function () {
          //console.log("OK");
          $scope.estados = [{}];
          contenidoFactory.ServiceContenido('catalogs/countries/' + $scope.oferta.country + '/states/?format=json', 'GET', '{}').then(function (data) {
              console.log(data.data);
              $scope.estados = data.data;

              if ($scope.estados == "") {
                  $scope.IsCiudad = false;
                  //$scope.user.city = "";
                  //if ($scope.user.city != "") {
                  //    $scope.user.city = $scope.user.city;
                  //}
                  //else {

                  //}
              }
              else {
                  $scope.IsCiudad = true;
              }
          });
      }

      //profesiones
      $scope.buscarprofesiones = function () {

          if ($scope.buscarprofesion == "") {
              $scope.profesiones = "";
          }
          else {
              contenidoFactory.ServiceContenido('catalogs/professions/?format=json', 'GET', '{}').then(function (data) {
                  //console.log(data.data);
                  $scope.profesiones = data.data;
                  $scope.tempData = [];

                  for (var j = 0; j < $scope.professions.length; j++) {
                      //$scope.tempProfesiones.push($scope.user.professions[j].id);
                      for (var i = 0; i < $scope.profesiones.length; i++) {
                          //$scope.tempData.push($scope.profesiones[i]);
                          //$scope.profesiones.splice(i, i + 1);
                          if ($scope.profesiones[i].id == $scope.professions[j].id) {
                              //console.log();
                              $scope.tempData.push($scope.profesiones[i]);

                              $scope.profesiones.splice(i, 1);
                          }

                      }
                  }
              });
          }
      }

      $scope.changeclassazul = function (obj) {

          if (document.getElementById('cb-' + obj.name).checked == true) {
              $scope.tempProfesiones.push(obj.id);
              $scope.professions.push({
                  id: obj.id,
                  name: obj.name
              });

              for (var j = 0; j < $scope.profesiones.length; j++) {

                  if ($scope.profesiones[j].id == obj.id) {
                      $scope.profesiones.splice(j, 1);
                  }
              }

              document.getElementById('btn-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp";
              document.getElementById('cb-' + obj.name).checked = false;
          }
          else {

              var index = $scope.tempProfesiones.indexOf(obj.id);
              $scope.tempProfesiones.splice(index, 1);
              $scope.professions.splice(index, 1);
              document.getElementById('cb-' + obj.name).checked = true;
              document.getElementById('btn-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp-sin";
          }

      }

      //intereses
      contenidoFactory.ServiceContenido('catalogs/interests/?format=json', 'GET', '{}').then(function (data) {
          $scope.intereses = data.data;

      });

      //Servicios
      //contenidoFactory.ServiceContenido('catalogs/opening-class/?format=json', 'GET', '{}').then(function (data) {

      //    $scope.servicios = data.data;

      //})

      $scope.changeinteres = function (obj) {
          if (document.getElementById('int-' + obj.name).checked == true) {
              var index = $scope.tempIntereses.indexOf(obj.id);
              $scope.tempIntereses.splice(index, 1);
              document.getElementById('btnint-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp-sin";
              document.getElementById('int-' + obj.name).checked = false;
          }
          else {
              $scope.tempIntereses.push(obj.id);

              document.getElementById('int-' + obj.name).checked = true;
              document.getElementById('btnint-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp";
          }
          console.log($scope.tempIntereses);
      }

      //Nueva Oferta
      $scope.guardarOferta = function () {

          contenidoFactory.ServicePerfil('openings/create/', 'POST', {
              "company": $window.localStorage.id_company,
              "opening_type": $scope.oferta.opening_type,
              "keep_company_alias": $scope.oferta.keep_company_alias,
              "alternate_company_alias": $scope.oferta.alternate_company_alias,
              "alternate_company_description": "",
              "name": $scope.oferta.name,
              "years_experience_opening": $scope.oferta.years_experience_opening,
              "years_experience": $scope.oferta.years_experience,
              "country": $scope.oferta.country,
              "city": $scope.oferta.city,
              "avaliability": $scope.oferta.avaliability,
              "salary": $scope.oferta.salary,
              "currency": $scope.oferta.currency,
              "private_salary": $scope.oferta.private_salary,
              "open_opening": $scope.oferta.open_opening,
              "close_opening": $scope.oferta.close_opening,
              "activities": $scope.oferta.activities,
              "responsabilities": $scope.oferta.responsabilities,
              "key_skills": $scope.oferta.key_skills,
              "team_profile": $scope.oferta.team_profile,
              "interests": $scope.tempIntereses,
              "professions": $scope.tempProfesiones,
              "perks": $scope.oferta.perks,
              "relevant_details": $scope.oferta.relevant_details,
              "hire_type": $scope.oferta.hire_type,
              "status_opening": 'published'

          }).then(function (data) {
              console.log(data);
              $window.location.href = "/vacanterecibida";
          });
      }

      $scope.error = function () {
          //console.log($scope.oferta.activities);
          if ($scope.oferta.name == undefined || $scope.oferta.name == "") {
              focus('oferta.name');
          }
          else {
              if ($scope.oferta.opening_type == undefined || $scope.oferta.opening_type == "") {
                  focus('oferta.opening_type');
              }
              else {
                  if ($scope.oferta.country == undefined || $scope.oferta.country == "") {
                      focus('oferta.country');
                  }
                  else {
                      if ($scope.oferta.years_experience_opening == undefined || $scope.oferta.years_experience_opening == "") {
                          focus('oferta.years_experience_opening');
                      }
                      else {
                          if ($scope.oferta.years_experience == undefined || $scope.oferta.years_experience == "") {
                              focus('oferta.years_experience');
                          }
                          else {
                              if ($scope.oferta.avaliability == undefined || $scope.oferta.avaliability == "") {
                                  focus('oferta.avaliability');
                              }
                              else {
                                  if ($scope.oferta.salary == undefined || $scope.oferta.salary == "") {
                                      focus('oferta.salary');
                                  }
                                  else {
                                      if ($scope.oferta.open_opening == undefined || $scope.oferta.open_opening == "") {
                                          focus('oferta.open_opening');
                                      }
                                      else {
                                          if ($scope.oferta.close_opening == undefined || $scope.oferta.close_opening == "") {
                                              focus('oferta.close_opening');
                                          }
                                          else {
                                              if ($scope.oferta.hire_type == undefined || $scope.oferta.hire_type == "") {
                                                  focus('oferta.hire_type');
                                              }
                                              //else {
                                              //    if ($scope.oferta.activities == undefined || $scope.oferta.activities == "") {
                                              //        console.log("YUUU");
                                              //        focus('oferta.activities');
                                              //        $scope.textarea = 'select_textarea';
                                              //    }
                                                  
                                              //}
                                          }
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }



          //

          //if ($scope.oferta.avaliability == undefined || $scope.oferta.avaliability == "") {
          //    focus('oferta.avaliability');
          //}

          //if ($scope.oferta.hire_type == undefined || $scope.oferta.hire_type == "") {
          //    focus('oferta.hire_type');
          //}

          //if ($scope.oferta.opening_type == undefined || $scope.oferta.opening_type == "") {
          //    contenidoFactory.mensaje(ev, "Tipo de vacante sin llenar.");
          //}
      }

      //Borrador
      $scope.borradorOferta = function (ev) {

          contenidoFactory.ServicePerfil('openings/create/', 'POST', {
              "company": $window.localStorage.id_company,
              "opening_type": $scope.oferta.opening_type,
              "keep_company_alias": $scope.oferta.keep_company_alias,
              "alternate_company_alias": $scope.oferta.alternate_company_alias,
              "alternate_company_description": "",
              "name": $scope.oferta.name,
              "years_experience_opening": $scope.oferta.years_experience_opening,
              "years_experience": $scope.oferta.years_experience,
              "country": $scope.oferta.country,
              "city": $scope.oferta.city,
              "avaliability": $scope.oferta.avaliability,
              "salary": $scope.oferta.salary,
              "currency": $scope.oferta.currency,
              "private_salary": $scope.oferta.private_salary,
              "open_opening": $scope.oferta.open_opening,
              "close_opening": $scope.oferta.close_opening,
              "activities": $scope.oferta.activities,
              "responsabilities": $scope.oferta.responsabilities,
              "key_skills": $scope.oferta.key_skills,
              "team_profile": $scope.oferta.team_profile,
              "interests": $scope.tempIntereses,
              "professions": $scope.tempProfesiones,
              "perks": $scope.oferta.perks,
              "relevant_details": $scope.oferta.relevant_details,
              "hire_type": $scope.oferta.hire_type,
              "status_opening": 'draft',
              "opening_class": $scope.oferta.opening_class

          }).then(function (data) {
              console.log(data);
              //$window.location.href = "/vacanterecibida";
              if (data.company != undefined) {
                  contenidoFactory.mensaje(ev, "Gracias. Tu vacante se encuentra en proceso de aprobación.");
              }
          });
      }
  }]);
